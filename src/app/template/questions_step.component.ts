import {
  LoadingComponent,
  RadioGroupComponent,
  StepsComponent,
  TextComponent,
  TimerComponent,
} from '#components';
import {
  HttpVacancyService,
  LocalStorageService,
  TimerService,
} from '#services';
import { IQuestionData, IServerResponseData } from '#types';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { catchError, EMPTY, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-questions-step',
  standalone: true,
  imports: [
    NzFormModule,
    NzButtonModule,
    StepsComponent,
    TextComponent,
    ReactiveFormsModule,
    TimerComponent,
    RadioGroupComponent,
    LoadingComponent,
  ],
  template: `
    @if(isLoading()) {

    <div class="flex items-center justify-center !min-h-[500px]">
      <app-loading></app-loading>
    </div>
    } @else {
    <div class="flex items-center justify-center ">
      <app-timer></app-timer>
    </div>
    <app-steps [stepsSize]="stepsSize()" [current]="current() - 1"></app-steps>
    <form
      nz-form
      [formGroup]="validateForm"
      (ngSubmit)="onSubmit()"
      class="h-[80%]"
    >
      @if(question()) {
      <div class="h-[80%] bg-gray-300">
        <div class="p-4">
          <div class="text-2xl mb-4">{{ question().question }}</div>
          <app-radio-group
            name="option"
            [optionList]="question().options"
            [disabled]="radionButtonDisabled()"
          />
          <app-text
            class="hidden"
            name="questionList"
            errorText=""
            label=""
            type="hidden"
            placeholder=""
          />
        </div>
      </div>
      }
      <div class="mt-6 flex items-end justify-end px-4">
        @if (current() < stepsSize().length ) {
        <button
          class="ml-2 w-[150px] uppercase"
          nz-button
          type="button"
          nzType="default"
          (click)="next()"
          [disabled]="activeButton() ? isDisabled() : false"
        >
          İrəli
        </button>
        } @if (current() === stepsSize().length) {
        <button
          class="ml-2 w-[150px] uppercase"
          nz-button
          nzType="primary"
          type="submit"
          [disabled]="activeButton() ? isDisabled() : false"
        >
          Tamamla
        </button>
        }
      </div>
    </form>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionsStepComponent {
  protected localStorageService = inject(LocalStorageService);
  protected vacancyService = inject(HttpVacancyService);
  protected activeRoute = inject(ActivatedRoute);
  protected timerService = inject(TimerService);
  protected router = inject(Router);
  //
  protected questionData = signal<IQuestionData>({});
  protected questions = signal<IQuestionData>({});
  public stepsSize = signal<number[]>([]);
  public isLoading = signal<boolean>(true);
  public activeButton = signal<boolean>(false);
  public radionButtonDisabled = signal<boolean>(false);
  public optionList = signal<number>(0);
  public current = signal<number>(1);
  //
  protected validateForm: FormGroup;
  private destroy$ = new Subject<void>();
  private destroyQuestion$ = new Subject<void>();
  constructor(private fb: FormBuilder) {
    this.validateForm = this.fb.group({
      option: null,
      questionList: null,
    });
  }

  public ngOnInit() {
    const id: string = this.activeRoute.snapshot.params['id'];
    this.vacancyService
      .getQuestins(id)
      .pipe(
        takeUntil(this.destroyQuestion$),
        catchError(() => {
          return EMPTY;
        })
      )
      .subscribe((data: IServerResponseData) => {
        const steps = data.steps;
        this.stepsSize.set(steps);
        this.questions.set(data.question);
        this.isLoading.set(false);
      });
    const currentStep = this.localStorageService.getItem('current_step');
    if (currentStep) {
      this.current.set(+currentStep);
    }
    const question = this.localStorageService.getItem(
      'questions'
    ) as IQuestionData;
    this.questionData.update((prev) => {
      return {
        ...prev,
        ...question,
      };
    });
    this.activeButton.set(true);
    this.timerService.timerFinished.subscribe((isDisabled) => {
      if (isDisabled) {
        this.activeButton.set(false);
        this.radionButtonDisabled.set(true);
      }
    });
  }

  public question = computed(() => this.questions()[this.current()]);

  optionText() {
    return this.question().options.find(
      (item) => item.value === this.validateForm.get('option')?.value
    )?.label;
  }

  isDisabled() {
    return this.validateForm.get('option')?.value === null;
  }

  addQuestion() {
    return this.fb.group({
      question: [this.question()],
      option: [this.validateForm.get('option')?.value],
    });
  }

  protected next(): void {
    if (!this.questionData()[this.current()]) {
      this.questionData.update((prev) => {
        return {
          ...prev,
          [this.current()]: this.validateForm.get('option')?.value || '0',
        };
      });
    }
    this.activeButton.set(true);
    this.validateForm.setValue({
      option: null,
      questionList: this.addQuestion().value,
    });
    this.radionButtonDisabled.set(false);

    this.current.update((current) => current + 1);
    this.localStorageService.setItem('current_step', this.current());
    this.localStorageService.setItem('questions', this.questionData());
    this.timerService.onTimeStart();
  }

  public onSubmit(): void {
    const id = this.activeRoute.snapshot.params['id'];
    this.questionData.update((prev) => {
      return {
        ...prev,
        [this.current()]: this.validateForm.get('option')?.value || '0',
      };
    });
    this.localStorageService.setItem('questions', this.questionData());
    this.vacancyService
      .applayVacancy(
        {
          answerQuestions: this.questionData(),
          userData: this.localStorageService.getItem('user'),
        },
        this.activeRoute.snapshot.params['id']
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.localStorageService.removeItem('user'),
          this.localStorageService.removeItem('questions'),
          this.localStorageService.removeItem('current_step'),
          this.router.navigate(['', id, data.id], { replaceUrl: true });
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroyQuestion$.next();
    this.destroyQuestion$.complete();
  }
}

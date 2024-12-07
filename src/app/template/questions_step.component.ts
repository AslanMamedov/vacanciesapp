import {
  RadioGroupComponent,
  StepsComponent,
  TextComponent,
  TimerComponent,
} from '#components';
import { HttpVacancyService, LocalStorageService } from '#services';
import { IQuestionData } from '#types';
import { generateSteps } from '#utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { catchError, EMPTY } from 'rxjs';

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
  ],
  template: `
    <div class="flex items-center justify-center ">
      <app-timer></app-timer>
    </div>
    <app-steps [stepsSize]="stepsSize()" [current]="current()"></app-steps>
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
          <app-radio-group name="option" [optionList]="question().options" />
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
        @if (current() < stepsSize().length - 1) {
        <button
          class="ml-2 w-[150px] uppercase"
          nz-button
          type="button"
          nzType="default"
          (click)="next()"
          [disabled]="isDisabled()"
        >
          İrəli
        </button>
        } @if (current() === stepsSize().length - 1) {
        <button
          class="ml-2 w-[150px] uppercase"
          nz-button
          nzType="primary"
          type="submit"
          [disabled]="isDisabled()"
        >
          Tamamla
        </button>
        }
      </div>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionsStepComponent {
  protected localStorageService = inject(LocalStorageService);
  protected vacancyService = inject(HttpVacancyService);
  protected activeRoute = inject(ActivatedRoute);
  //
  protected questionData = signal<IQuestionData>({});
  protected questions = signal<IQuestionData>({});
  public stepsSize = signal<number[]>([]);
  public optionList = signal<number>(0);
  public current = signal<number>(0);
  //
  protected validateForm: FormGroup;

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
        catchError(() => {
          return EMPTY;
        })
      )
      .subscribe((data: IQuestionData) => {
        const steps = generateSteps(Object.keys(data).length);
        this.stepsSize.set(steps);
        this.questions.set(data);
      });
    const currentStep = this.localStorageService.getItem('current_step');
    if (currentStep) {
      this.current.set(+currentStep);
    }
  }

  public question = computed(() => this.questions()[this.current() + 1]);

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
          [this.current()]: {
            question: this.question().question,
            option: this.validateForm.get('option')?.value,
            optionText: this.optionText(),
            right: this.question().rightAnswer,
          },
        };
      });
    }

    this.validateForm.setValue({
      option: null,
      questionList: this.addQuestion().value,
    });
    this.localStorageService.setItem('current_step', this.current() + 1);
    this.current.update((current) => current + 1);
  }

  public onSubmit(): void {
    console.log(this.questionData());
  }
}

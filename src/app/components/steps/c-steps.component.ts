import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { CInputRadioGroupComponent } from '../formInputs/c-input-radio-group.component';
import { IInputOptions, IQuestionData } from '#types';
import { questionList, questionListLength } from '#constant';
import { CInputTextComponent } from '../formInputs';
import { generateSteps } from '#utils/generateSteps';
import { CStepListComponent } from './c-step-list.component';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {

  UserDataActions,
  userQuestionsRightCountSelector,
  userQuestionsSelector,
} from '#store';
import { LocalStorageService } from '#services';
import { TimerActions, timerStartedSelector } from '#store/timer';
@Component({
  selector: 'app-c-steps',
  standalone: true,
  imports: [
    NzButtonModule,
    NzStepsModule,
    ReactiveFormsModule,
    NzRadioModule,
    NzFormModule,
    CInputRadioGroupComponent,
    CInputTextComponent,
    CStepListComponent,
  ],
  template: `
    <app-c-step-list [current]="current()" [stepsSize]="stepsSize()" />
    <form
      nz-form
      [formGroup]="validateForm"
      (ngSubmit)="onSubmit()"
      class="h-[80%]"
    >
      <div class="h-[80%] bg-gray-300">
        <div class="p-4">
          <div class="text-2xl mb-4">{{ question() }}</div>
          <app-c-input-radio-group
            name="option"
            [optionList]="questionOptions()"
          />
          <app-c-input-text
            class="hidden"
            name="questionList"
            errorText=""
            label=""
            type="hidden"
            placeholder=""
          />
        </div>
      </div>
      <div class="mt-6 flex items-end justify-end px-4">
        @if (current() > 0) {
        <button
          class="ml-2 w-[150px] uppercase"
          nz-button
          type="button"
          nzType="default"
          (click)="pre()"
        >
          Geri
        </button>
        } @if (current() < stepsSize().length - 1) {
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
export class CStepsComponent {
  public vacancyId = input.required<number | null | string>({
    alias: 'vacancyId',
  });
  current = signal<number>(0);
  protected stepsSize = signal<number[]>(generateSteps(questionListLength));
  protected validateForm: FormGroup;
  protected questionData = signal<IQuestionData>({});
  public store = inject(Store);
  public localStorage = inject(LocalStorageService);
  protected router = inject<Router>(Router);
  public optionList: IInputOptions[] = [
    { label: 'Bəli', value: 'Yes' },
    { label: 'Xeylr', value: 'No' },
    { label: 'Başqa səbəb', value: 'Cancel' },
  ];

  constructor(private fb: FormBuilder) {
    this.validateForm = this.fb.group({
      option: null,
      questionList: null,
    });
  }
  get questionListForm(): FormArray {
    return this.validateForm.get('questionList') as FormArray;
  }
  question() {
    return questionList[this.current() + 1]?.question;
  }

  rightAnswer() {
    return questionList[this.current() + 1].rightAnswer;
  }

  questionOptions() {
    return questionList[this.current() + 1]?.options || this.optionList;
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
  protected pre(): void {
    this.validateForm.patchValue({
      option: this.questionData()[this.current() - 1]?.option,
    });
    this.questionData.update((prev) => {
      delete prev[this.current() - 1];
      return prev;
    });

    this.current.update((current) => current - 1);
  }

  optionText() {
    return this.questionOptions().find(
      (item) => item.value === this.validateForm.get('option')?.value
    )?.label;
  }

  protected next(): void {
    if (!this.questionData()[this.current()]) {
      this.questionData.update((prev) => {
        return {
          ...prev,
          [this.current()]: {
            question: this.question(),
            option: this.validateForm.get('option')?.value,
            optionText: this.optionText(),
            right: this.rightAnswer(),
          },
        };
      });
    }
    this.validateForm.setValue({
      option: null,
      questionList: this.addQuestion().value,
    });
    this.current.update((current) => current + 1);
  }

  timeFinishedEffect = effect(() => {
    this.store.select(timerStartedSelector).subscribe((result) => {
      if (!result) {
        this.store.dispatch(
          UserDataActions.addUserQuestions({ payload: this.questionData() })
        );
        this.store.select(userQuestionsSelector).subscribe((result) => {
          this.localStorage.setItem('questionList', result);
        });
        this.store
          .select(userQuestionsRightCountSelector)
          .subscribe((result) => {
            this.localStorage.setItem('count', result);
          });
      }
    });
  }, {});

  onSubmit(): void {
    this.questionData.update((prev) => {
      return {
        ...prev,
        [this.current()]: {
          question: this.question(),
          option: this.validateForm.get('option')?.value,
          optionText: this.optionText(),
          right: this.rightAnswer(),
        },
      };
    });

    this.store.dispatch(
      UserDataActions.addUserQuestions({ payload: this.questionData() })
    );
    this.store.dispatch(TimerActions.timerFinished());
    this.store.select(userQuestionsSelector).subscribe((result) => {
      this.localStorage.setItem('questionList', result);
    });
    this.store.select(userQuestionsRightCountSelector).subscribe((result) => {
      this.localStorage.setItem('count', result);
    });

    this.router.navigate([this.vacancyId(), 'result']);
  }
}

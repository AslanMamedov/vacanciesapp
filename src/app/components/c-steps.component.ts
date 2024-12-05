import {
  ChangeDetectionStrategy,
  Component,
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
import { CInputRadioGroupComponent } from './formInputs/c-input-radio-group.component';
import { IInputOptions, IQuestionData } from '#types';
import { questionList } from '#constant';
import { CInputTextComponent } from './formInputs';
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
  ],
  template: `
    <nz-steps [nzCurrent]="current()" class="p-4 ">
      @for(step of stepsSize(); track step) {
      <nz-step></nz-step>
      }
    </nz-steps>

    <form
      nz-form
      [formGroup]="validateForm"
      (ngSubmit)="onSubmit()"
      class="h-[80%]"
    >
      <div class="h-[80%] bg-gray-300">
        <div class="p-4">
          {{ question() }}
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
  current = signal<number>(0);
  public stepsSize = input.required<number[]>({ alias: 'stepsSize' });
  protected validateForm: FormGroup;
  protected questionData = signal<IQuestionData>({});
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

    this.current.update((current) => current - 1);
  }
  protected next(): void {
    if (!this.questionData()[this.current()]) {
      this.questionData.update((prev) => {
        return {
          ...prev,
          [this.current()]: {
            question: this.question(),
            option: this.validateForm.get('option')?.value,
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

  onSubmit(): void {
    console.log('submit', this.validateForm.value);
  }
}

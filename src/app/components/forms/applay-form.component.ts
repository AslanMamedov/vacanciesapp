import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';

import { NumberList } from '#types/union';
import {
  CConfirmModalComponent,
  CInputPhoneComponent,
  CInputTextComponent,
} from '#components';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applay-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    CInputTextComponent,
    CInputPhoneComponent,
    CConfirmModalComponent,
  ],
  template: `
    <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()" class="">
      <app-c-input-text
        name="name"
        errorText="Adını daxil edin!"
        placeholder="Ad"
        label="Ad"
      />
      <app-c-input-text
        name="surname"
        errorText="Soyadını daxil edin!"
        placeholder="Soyad"
        label="Soyad"
      />
      <app-c-input-text
        name="email"
        errorText="E-mail daxil edin!"
        placeholder="E-mail"
        label="E-mail"
      />
      <app-c-input-phone
        errorText="Telefon daxil edin!"
        label="Telefon"
        mask="000-00-00"
        name="phoneNumber"
        placeholder="Telefon"
        [prefixList]="phonePrefixList"
      />

      <nz-form-item nz-row class="applay-area ">
        <nz-form-control>
          <button type="submit" class="w-full" nz-button nzType="primary">
            Davam et
          </button>
        </nz-form-control>
      </nz-form-item>
    </form>
    <app-c-confirm-modal
      [isShowConfirm]="showConfirm()"
      [id]="vacancyId()"
      (onClose)="onClose($event)"
    ></app-c-confirm-modal>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplayFormComponent {
  private destroy$ = new Subject<void>();
  public vacancyId = input.required<string | number | null>({
    alias: 'id',
  });
  public isVisible = input.required<boolean>({
    alias: 'isVisible',
  });
  public showConfirm = signal<boolean>(false);

  protected validateForm: FormGroup;
  public phonePrefixList: NumberList[] = ['055', '050', '070'];
  constructor(private fb: NonNullableFormBuilder) {
    this.validateForm = this.fb.group({
      surname: this.fb.control('', [Validators.required]),
      name: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.email, Validators.required]),
      phoneNumberPrefix: this.fb.control<NumberList>('055'),
      phoneNumber: this.fb.control('', [Validators.required]),
    });
  }

  onClose($event: boolean): void {
    this.showConfirm.set($event);
  }

  effect = effect(
    () => {
      if (this.isVisible()) {
        this.validateForm.reset();
      }
    },
    { allowSignalWrites: true }
  );

  protected submitForm(): void {
    if (this.validateForm.valid) {
      const vacancyData = {
        ...this.validateForm.value,
        id: this.vacancyId(),
      };
      this.showConfirm.set(true);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  ngOnChanges(): void {}

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

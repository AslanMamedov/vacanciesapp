import { ChangeDetectionStrategy, Component } from '@angular/core';
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
import { CInputPhoneComponent, CInputTextComponent } from '#components';

@Component({
  selector: 'app-applay-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    CInputTextComponent,
    CInputPhoneComponent,
  ],
  template: `
    <form
      nz-form
      [formGroup]="validateForm"
      (ngSubmit)="submitForm()"
      class="w-[600px] m-4"
    >
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
        <nz-form-control [nzSpan]="14" [nzOffset]="6">
          <button type="submit" nz-button nzType="primary">Təstiq et</button>
        </nz-form-control>
      </nz-form-item>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplayFormComponent {
  private destroy$ = new Subject<void>();
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

  protected submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

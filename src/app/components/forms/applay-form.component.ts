import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,

  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
@Component({
  selector: 'app-applay-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    NzCheckboxModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NgxMaskDirective,
  ],
  providers: [provideNgxMask()],
  template: `
    <form
      nz-form
      [formGroup]="validateForm"
      (ngSubmit)="submitForm()"
      class="w-[600px] m-4"
    >
      <nz-form-item class="!border-red-400">
        <nz-form-control [nzSm]="14" [nzXs]="24" nzErrorTip="Adını daxil edin!">
          <nz-form-label [nzSm]="6" [nzXs]="24" nzFor="name" nzRequired
            >Ad
          </nz-form-label>
          <input nz-input id="name" formControlName="name" placeholder="Ad" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control
          [nzSm]="14"
          [nzXs]="24"
          nzErrorTip="Soyadını daxil edin!"
        >
          <nz-form-label [nzSm]="6" [nzXs]="24" nzFor="surname" nzRequired
            >Soyad
          </nz-form-label>
          <input
            nz-input
            id="surname"
            formControlName="surname"
            placeholder="Soyad"
          />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control
          [nzSm]="14"
          [nzXs]="24"
          nzErrorTip="E-mail daxil edin!"
        >
          <nz-form-label [nzSm]="6" [nzXs]="24" nzRequired nzFor="email"
            >E-mail</nz-form-label
          >
          <input nz-input formControlName="email" id="email" />
        </nz-form-control>
      </nz-form-item>

      <nz-form-item>
        <nz-form-control
          [nzSm]="14"
          [nzXs]="24"
          [nzValidateStatus]="validateForm.controls['phoneNumber']"
          nzErrorTip="Telefon daxil edin!"
        >
          <nz-form-label [nzSm]="6" [nzXs]="24" nzFor="phoneNumber" nzRequired
            >Telefon nömrəsi</nz-form-label
          >
          <nz-input-group [nzAddOnBefore]="addOnBeforeTemplate">
            <ng-template #addOnBeforeTemplate>
              <nz-select formControlName="phoneNumberPrefix" class="!w-[80px]">
                <nz-option nzLabel="055" nzValue="055"></nz-option>
                <nz-option nzLabel="050" nzValue="050"></nz-option>
                <nz-option nzLabel="070" nzValue="070"></nz-option>
              </nz-select>
            </ng-template>
            <input
              formControlName="phoneNumber"
              id="'phoneNumber'"
              nz-input
              type="text"
              mask="000-00-00"
            />
          </nz-input-group>
        </nz-form-control>
      </nz-form-item>

      <nz-form-item nz-row class="register-area ">
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
  validateForm: FormGroup;

  constructor(private fb: NonNullableFormBuilder) {
    this.validateForm = this.fb.group({
      email: this.fb.control('', [Validators.email, Validators.required]),
      phoneNumberPrefix: this.fb.control<'050' | '055'>('055'),
      phoneNumber: this.fb.control('', [Validators.required]),
      name: this.fb.control('', [Validators.required]),
      surname: this.fb.control('', [Validators.required]),
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submitForm(): void {
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
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
    const formControl = this.validateForm.get('phoneNumber');
    if (formControl) {
      formControl.setValue(input.value, { emitEvent: false });
    }
  }
}

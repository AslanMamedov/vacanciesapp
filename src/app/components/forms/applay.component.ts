import { LabelComponent } from '#components/form_inputs/label.component';
import { SelectComponent } from '../form_inputs/select.component';
import { TextComponent } from '#components/form_inputs';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { IUserData, NumberList } from '#types';
import { Router } from '@angular/router';
import { phonePrefix } from '#constants';
import { Subscription } from 'rxjs';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup,
} from '@angular/forms';

import {
  LocalStorageService,
  DrawerService,
  TimerService,
  UserService,
} from '#services';
//--

@Component({
  selector: 'app-applay',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SelectComponent,
    NzButtonModule,
    LabelComponent,
    NzFormModule,
    TextComponent,
  ],
  template: `
    <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()" class="">
      <app-text name="name" errorText="Adını daxil edin!" placeholder="Ad">
        <app-label ngProjectAs="label" label="Ad" name="name"></app-label>
      </app-text>
      <app-text
        name="surname"
        placeholder="Soyad"
        errorText="Soyadını daxil edin!"
      >
        <app-label ngProjectAs="label" label="Soyad" name="surname"></app-label>
      </app-text>
      <app-text
        name="email"
        placeholder="E-mail"
        errorText="E-mail daxil edin!"
      >
        <app-label ngProjectAs="label" label="E-mail" name="email"></app-label>
      </app-text>

      <app-text
        mask="000-00-00"
        name="phoneNumber"
        [withSelect]="true"
        placeholder="Telefon"
        errorText="Telefon daxil edin!"
      >
        <app-label
          label="Telefon"
          name="phoneNumber"
          ngProjectAs="label"
        ></app-label>

        <app-select
          ngProjectAs="component"
          [name]="'phoneNumberPrefix'"
          [optionList]="phonePrefixList"
        ></app-select>
      </app-text>

      <nz-form-item nz-row class="applay-area ">
        <nz-form-control>
          <button type="submit" class="w-full" nz-button nzType="primary">
            Davam et
          </button>
        </nz-form-control>
      </nz-form-item>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplayComponent {
  protected userData = signal<IUserData | null>(null);
  public phonePrefixList: NumberList[] = phonePrefix;
  protected validateForm: FormGroup;
  protected subscription$: Subscription | null = null;
  //
  protected localStorageService = inject(LocalStorageService);
  protected drawerService = inject(DrawerService);
  protected userService = inject(UserService);
  protected timerService = inject(TimerService);
  protected router = inject<Router>(Router);
  protected modal = inject(NzModalService);
  //
  constructor(private fb: NonNullableFormBuilder) {
    this.validateForm = this.fb.group({
      email: this.fb.control('', [Validators.email, Validators.required]),
      phoneNumber: this.fb.control('', [Validators.required]),
      phoneNumberPrefix: this.fb.control<NumberList>('055'),
      surname: this.fb.control('', [Validators.required]),
      name: this.fb.control('', [Validators.required]),
    });
  }

  protected ngOnInit(): void {
    this.subscription$ = this.drawerService.dreawerIsVisible.subscribe(
      (isVisible) => {
        if (!isVisible) {
          this.validateForm.reset();
        }
      }
    );
  }

  protected showConfirm(id: string): void {
    this.modal.confirm({
      nzTitle: '<i>Vakansiyaya müraciət etmək üçün testdən keçməlisiniz.</i>',
      nzContent:
        '<b>Test 15 dəqiqə ərzində tamamlanacaq və hər düzgün cavab 1 bal olaraq hesablanacaq.</b>',
      nzOnOk: () => {
        this.localStorageService.setItem('current_step', 1);
        this.localStorageService.setItem('user', this.userData());
        this.router.navigate(['', id]);
        this.timerService.onTimeStart();
      },
      nzOkText: 'Testə başla',
      nzCancelText: null,
    });
  }

  protected submitForm(): void {
    const id = this.userService.getVacancyId();
    if (this.validateForm.valid) {
      const vacancyData: IUserData = {
        ...this.validateForm.value,
        id: id,
      };
      this.showConfirm(id);
      this.userData.set(vacancyData);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  protected ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }
}

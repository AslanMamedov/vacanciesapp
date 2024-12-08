import { TextComponent } from '#components/form_inputs';
import { ControlComponent } from '#components/form_inputs/control.component';
import { LabelComponent } from '#components/form_inputs/label.component';
import { IUserData, NumberList } from '#types';
import {
  afterNextRender,
  afterRender,
  ChangeDetectionStrategy,
  Component,
  DoCheck,
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
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { Subject } from 'rxjs';
import { SelectComponent } from '../form_inputs/select.component';
import {
  DrawerService,
  LocalStorageService,
  TimerService,
  UserService,
} from '#services';
import { phonePrefix } from '#constants';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applay',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    TextComponent,
    SelectComponent,
    LabelComponent,
  ],
  template: `
    <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()" class="">
      <app-text name="name" errorText="Adını daxil edin!" placeholder="Ad">
        <app-label ngProjectAs="label" label="Ad" name="name"></app-label>
      </app-text>
      <app-text
        name="surname"
        errorText="Soyadını daxil edin!"
        placeholder="Soyad"
      >
        <app-label ngProjectAs="label" label="Soyad" name="surname"></app-label>
      </app-text>
      <app-text
        name="email"
        errorText="E-mail daxil edin!"
        placeholder="E-mail"
      >
        <app-label ngProjectAs="label" label="E-mail" name="email"></app-label>
      </app-text>

      <app-text
        errorText="Telefon daxil edin!"
        mask="000-00-00"
        name="phoneNumber"
        placeholder="Telefon"
        [withSelect]="true"
      >
        <app-label
          ngProjectAs="label"
          label="Telefon"
          name="phoneNumber"
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
  protected validateForm: FormGroup;
  public phonePrefixList: NumberList[] = phonePrefix;
  protected userData = signal<IUserData | null>(null);

  //
  public localStorageService = inject(LocalStorageService);
  protected drawerService = inject(DrawerService);
  protected userService = inject(UserService);
  public timerService = inject(TimerService);
  protected router = inject<Router>(Router);
  protected modal = inject(NzModalService);

  //
  constructor(private fb: NonNullableFormBuilder) {
    this.validateForm = this.fb.group({
      surname: this.fb.control('', [Validators.required]),
      name: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.email, Validators.required]),
      phoneNumberPrefix: this.fb.control<NumberList>('055'),
      phoneNumber: this.fb.control('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.drawerService.dreawerIsVisible.subscribe((isVisible) => {
      if (!isVisible) {
        this.validateForm.reset();
      }
    });
  }

  showConfirm(id: string): void {
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
}

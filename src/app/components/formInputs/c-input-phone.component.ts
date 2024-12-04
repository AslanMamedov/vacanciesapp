import { NumberList } from '#types/union';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  InputSignal,
} from '@angular/core';
import {
  ReactiveFormsModule,
  ControlContainer,
  FormGroup,
} from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-c-input-phone',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NgxMaskDirective,
  ],
  providers: [provideNgxMask()],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  template: `
    <nz-form-item>
      <nz-form-control [nzSm]="14" [nzXs]="24" [nzErrorTip]="errorText()">
        <nz-form-label [nzSm]="6" [nzXs]="24" [nzFor]="name()" nzRequired>{{
          label()
        }}</nz-form-label>
        <nz-input-group [nzAddOnBefore]="addOnBeforeTemplate">
          <ng-template #addOnBeforeTemplate>
            <nz-select formControlName="phoneNumberPrefix" class="!w-[80px]">
              @for(prefix of prefixList(); track prefix ) {
              <nz-option [nzLabel]="prefix" [nzValue]="prefix"></nz-option>
              }
            </nz-select>
          </ng-template>
          <input
            [formControlName]="name()"
            [id]="name()"
            nz-input
            type="text"
            [mask]="mask()"
          />
        </nz-input-group>
      </nz-form-control>
    </nz-form-item>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CInputPhoneComponent {
  public name: InputSignal<string> = input.required({ alias: 'name' });
  public errorText: InputSignal<string> = input.required({
    alias: 'errorText',
  });
  public placeholder: InputSignal<string> = input.required({
    alias: 'placeholder',
  });
  public label: InputSignal<string> = input.required({ alias: 'label' });
  public mask: InputSignal<string> = input.required({ alias: 'mask' });
  public prefixList: InputSignal<NumberList[]> = input.required();

  public parentContainer: ControlContainer = inject(ControlContainer);
  public get parentFormGroup(): FormGroup {
    return this.parentContainer.control as FormGroup;
  }

  public ngOnInit(): void {
    this.parentFormGroup.addControl(
      this.name(),
      this.parentContainer?.control?.get(this.name())
    );
  }

  public ngOnDestroy(): void {
    this.parentFormGroup.removeControl(this.name());
  }
}

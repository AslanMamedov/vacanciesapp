import { IInputOptions } from '#types';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzRadioModule } from 'ng-zorro-antd/radio';

@Component({
  selector: 'app-radio-group',
  standalone: true,
  imports: [NzRadioModule, ReactiveFormsModule, NzFormModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  template: `
    <nz-form-item>
      <nz-form-control>
        <nz-radio-group [formControlName]="name()" class="flex flex-col gap-4">
          @for(option of optionList(); track option.value) {
          <label nz-radio [nzValue]="option.value" [nzDisabled]="disabled()">
            {{ option.label }}
          </label>
          }
        </nz-radio-group>
      </nz-form-control>
    </nz-form-item>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioGroupComponent {
  public name = input.required<string>({ alias: 'name' });
  public optionList = input.required<IInputOptions[]>();
  public disabled = input.required<boolean>({ alias: 'disabled' });
  // -----

  public parentContainer = inject<ControlContainer>(ControlContainer);
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

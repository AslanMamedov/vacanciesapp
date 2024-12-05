import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  InputSignal,
} from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-c-input-text',
  standalone: true,
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  template: `
    <nz-form-item class="">
      <nz-form-control [nzErrorTip]="errorText()" class="">
        <nz-form-label [nzSm]="6" [nzXs]="24" [nzFor]="name()" nzRequired
          >{{ label() }}
        </nz-form-label>
        <input
          nz-input
          [id]="name()"
          [formControlName]="name()"
          [placeholder]="placeholder()"
        />
      </nz-form-control>
    </nz-form-item>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CInputTextComponent {
  public name = input.required<string>({ alias: 'name' });
  public errorText = input.required<string>({
    alias: 'errorText',
  });
  public placeholder = input.required<string>({
    alias: 'placeholder',
  });
  public label = input.required<string>({
    alias: 'label',
  });
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

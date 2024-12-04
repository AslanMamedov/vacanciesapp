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
    <nz-form-item>
      <nz-form-control [nzSm]="14" [nzXs]="24" [nzErrorTip]="errorText()">
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
  public name: InputSignal<string> = input.required({ alias: 'name' });
  public errorText: InputSignal<string> = input.required({
    alias: 'errorText',
  });
  public placeholder: InputSignal<string> = input.required({
    alias: 'placeholder',
  });
  public label: InputSignal<string> = input.required({ alias: 'label' });
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

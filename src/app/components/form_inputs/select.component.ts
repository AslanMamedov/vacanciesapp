import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NumberList } from '#types';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import {
  ReactiveFormsModule,
  ControlContainer,
  FormGroup,
} from '@angular/forms';
//--
@Component({
  selector: 'app-select',
  standalone: true,
  imports: [ReactiveFormsModule, NzFormModule, NzSelectModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  template: `
    <nz-form-control>
      <nz-select [formControlName]="name()" class="!w-[80px]">
        @for(option of optionList(); track option) {
        <nz-option [nzLabel]="option" [nzValue]="option"></nz-option>
        }
      </nz-select>
    </nz-form-control>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent {
  public name = input.required<string>({ alias: 'name' });
  public optionList = input<NumberList[]>();
  //
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

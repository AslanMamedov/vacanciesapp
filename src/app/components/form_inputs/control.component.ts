import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  OnInit,
  OnDestroy,
  inject,
} from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule],
  providers: [provideNgxMask()],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  template: `
    <nz-form-item>
      <nz-form-control [nzErrorTip]="errorText || ''">
        <ng-content></ng-content>
      </nz-form-control>
    </nz-form-item>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlComponent implements OnInit, OnDestroy {
  @Input() public errorText: string | null = null; // Error text for the control
  @ContentChild('control', { static: true }) public content: any;

  public parentContainer = inject<ControlContainer>(ControlContainer);
  public get parentFormGroup(): FormGroup {
    return this.parentContainer.control as FormGroup;
  }

  public controlName: string | null = null;

  public ngOnInit(): void {
    this.controlName = this.content?.name || null;

    if (!this.controlName) {
      return;
    }

    const existingControl = this.parentFormGroup.get(this.controlName);

    if (!existingControl) {
      console.warn(
        `No control found in the FormGroup for name "${this.controlName}". Adding a placeholder control.`
      );
      this.parentFormGroup.addControl(this.controlName, null); // Add a placeholder control if necessary
    }
  }

  public ngOnDestroy(): void {
    if (this.controlName && this.parentFormGroup.contains(this.controlName)) {
      this.parentFormGroup.removeControl(this.controlName);
    }
  }
}

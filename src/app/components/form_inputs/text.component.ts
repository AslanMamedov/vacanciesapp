import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import {
  ChangeDetectionStrategy,
  TemplateRef,
  Component,
  viewChild,
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
  selector: 'app-text',
  standalone: true,
  imports: [
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NgxMaskDirective,
    ReactiveFormsModule,
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
      <nz-form-control [nzErrorTip]="errorText()">
        <ng-content select="label"></ng-content>
        <nz-input-group [nzAddOnBefore]="isPrefix()">
          @if(withSelect()) {
          <ng-template #addOnBeforeTemplate>
            <ng-content select="component"></ng-content>
          </ng-template>
          }
          <input
            [formControlName]="name()"
            [id]="name()"
            nz-input
            [placeholder]="placeholder()"
            type="text"
            [mask]="mask()"
          />
        </nz-input-group>
      </nz-form-control>
    </nz-form-item>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextComponent {
  public name = input.required<string>({ alias: 'name' });
  public placeholder = input.required<string>({
    alias: 'placeholder',
  });
  public withSelect = input<boolean>();
  public errorText = input<string>();
  public mask = input<string>();
  //
  protected addOnBeforeTemplate = viewChild('addOnBeforeTemplate', {
    read: TemplateRef,
  });
  public parentContainer = inject<ControlContainer>(ControlContainer);
  public get parentFormGroup(): FormGroup {
    return this.parentContainer.control as FormGroup;
  }

  protected isPrefix() {
    return this.withSelect() ? this.addOnBeforeTemplate() : '';
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

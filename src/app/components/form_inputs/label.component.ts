import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
//--
@Component({
  selector: 'app-label',
  standalone: true,
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule],
  template: `
    <nz-form-label [nzSm]="6" [nzXs]="24" [nzFor]="name()" nzRequired>{{
      label()
    }}</nz-form-label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelComponent {
  public label = input.required<string>({ alias: 'label' });
  public name = input.required<string>({ alias: 'name' });
}

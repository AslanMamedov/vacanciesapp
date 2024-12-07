import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-label',
  standalone: true,
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule],
  template: `
    <nz-form-label [nzSm]="6" [nzXs]="24" [nzFor]="name()" nzRequired>{{
      label()
    }}</nz-form-label>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelComponent {
  label = input.required<string>({ alias: 'label' });
  name = input.required<string>({ alias: 'name' });
}

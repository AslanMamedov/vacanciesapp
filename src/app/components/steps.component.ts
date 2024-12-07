import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NzStepsModule } from 'ng-zorro-antd/steps';

@Component({
  selector: 'app-steps',
  standalone: true,
  imports: [NzStepsModule],
  template: `
    <nz-steps [nzCurrent]="current()" class="p-4 ">
      @for(step of stepsSize(); track step) {
      <nz-step></nz-step>
      }
    </nz-steps>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepsComponent {
  stepsSize = input.required<number[]>({ alias: 'stepsSize' });
  current = input.required<number>({ alias: 'current' });
}

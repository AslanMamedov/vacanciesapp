import { QuestionsStepComponent } from '#template';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [QuestionsStepComponent],
  template: ` <app-questions-step></app-questions-step> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionsComponent {}

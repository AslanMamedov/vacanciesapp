import { ResultVacancyTestComponent } from '#template';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [ResultVacancyTestComponent],
  template: ` <app-result-vacancy-test></app-result-vacancy-test> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultComponent {}

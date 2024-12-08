import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VacancyComponent } from '#template';
//--
@Component({
  selector: 'app-vacancies',
  standalone: true,
  imports: [VacancyComponent],
  template: `<app-vacancy></app-vacancy>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VacanciesComponent {}

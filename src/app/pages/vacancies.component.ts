import { VacancyComponent } from '#template';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-vacancies',
  standalone: true,
  imports: [VacancyComponent],
  template: `<app-vacancy></app-vacancy>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VacanciesComponent {}

import { DrawerComponent, ConfirmComponent } from '#components';
import { ApplayComponent } from '#components/forms';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VacancyListComponent } from './vacancy-list.component';

@Component({
  selector: 'app-vacancy',
  standalone: true,
  imports: [
    DrawerComponent,
    ApplayComponent,
    VacancyListComponent,
    ConfirmComponent,
  ],
  template: `
    <app-vacancy-list></app-vacancy-list>
    <app-drawer>
      <app-applay></app-applay>
    </app-drawer>
    <app-confirm></app-confirm>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VacancyComponent {}

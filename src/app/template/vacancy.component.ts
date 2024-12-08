import { DrawerComponent } from '#components';
import { ApplayComponent } from '#components/forms';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VacancyListComponent } from './vacancy-list.component';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-vacancy',
  standalone: true,
  imports: [
    DrawerComponent,
    ApplayComponent,
    VacancyListComponent,
    NzModalModule,
  ],
  template: `
    <app-vacancy-list></app-vacancy-list>
    <app-drawer>
      <app-applay></app-applay>
    </app-drawer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VacancyComponent {}

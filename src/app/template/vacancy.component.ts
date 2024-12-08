import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ApplayComponent } from '#components/forms';
import { VacancyListComponent } from '#template';
import { DrawerComponent } from '#components';
//--
@Component({
  selector: 'app-vacancy',
  standalone: true,
  imports: [
    VacancyListComponent,
    DrawerComponent,
    ApplayComponent,
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

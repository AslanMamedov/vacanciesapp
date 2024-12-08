import { DrawerService, UserService } from '#services';
import { IVacany } from '#types';
import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-vacancy-card',
  standalone: true,
  imports: [NzCardModule, NzButtonModule, DatePipe, NzIconModule],
  template: `
    <nz-card class="w-full  h-[160px] mt-2">
      <div class="flex justify-between  h-[100px]  flex-1 gap-2">
        <div class="flex flex-col items-start flex-1 justify-between">
          <div class="flex flex-col gap-2">
            <span class="text-sm font-semibold">{{
              vacancy().created_at | date : 'dd.MM.yy'
            }}</span>
            <h5 class="font-bold" nz-typography>{{ vacancy().title }}</h5>
            <span>{{ vacancy().description }}</span>
          </div>
        </div>
        <div class="flex flex-col justify-between">
          <span
            class="border self-end  p-2 flex items-center gap-2 rounded-md bg-[#1890ff] text-white"
          >
            <span
              nz-icon
              class="text-xl"
              nzType="field-time"
              nzTheme="outline"
            ></span>
            Bitmə tarixi {{ vacancy().endDate | date : 'dd.MM.yy' }}</span
          >
          <button
            class="self-end rounded-md"
            type="button"
            [nzSize]="'large'"
            nz-button
            nzType="primary"
            (click)="applayVacancy(vacancy().id)"
          >
            Müraciət et
          </button>
        </div>
      </div>
    </nz-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VacancyCardComponent {
  public vacancy = input.required<IVacany>({ alias: 'vacancy' });

  protected drawerService = inject(DrawerService);
  protected userService = inject(UserService);
  public applayVacancy(id: string): void {
    this.userService.setVacancyId(id);
    this.drawerService.onIsVisibleHanler();
  }
}

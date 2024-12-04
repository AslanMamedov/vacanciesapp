import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'app-vacancies',
  standalone: true,
  imports: [
    NzBreadCrumbModule,
    NzIconModule,
    NzMenuModule,
    NzLayoutModule,
    NzCardModule,
    FormsModule,
    NzAvatarModule,
    NzCardModule,
    NzIconModule,
    NzSwitchModule,
    NzSkeletonModule,
    NzButtonModule,
    NzFlexModule,
    NzTypographyModule,
    NzButtonModule,
    NzInputModule,
    NzIconModule,
    NzModalModule,
  ],
  template: `
    @for(vacancy of vacancyLists; track vacancy.id) {

    <nz-card class="w-full  h-[160px] mt-2" [nzLoading]="loading">
      <div class="flex justify-between  h-[100px]  flex-1 gap-2">
        <div class="flex flex-col items-start flex-1 justify-between">
          <h5 nz-typography>{{ vacancy.title }}</h5>
          <span>{{ vacancy.description }}</span>
          <span
            class="border self-end  p-2 flex items-center gap-2 rounded-md bg-[#1890ff] text-white"
            ><span
              nz-icon
              class="text-xl"
              nzType="field-time"
              nzTheme="outline"
            ></span>
            {{ vacancy.endDate }}</span
          >
        </div>
        <button
          class="self-end rounded-md"
          type="button"
          [nzSize]="'large'"
          nz-button
          nzType="primary"
          (click)="applayVacancy(vacancy.id)"
        >
          Müraciət et
        </button>
      </div>
    </nz-card>
    }

    <nz-modal
      [(nzVisible)]="isVisible"
      nzTitle="Müraciət et forması"
      (nzOnCancel)="handleCancel()"
      (nzOnOk)="handleOk()"
      [nzOkLoading]="isOkLoading"
    >
      <p *nzModalContent></p>
    </nz-modal>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VacanciesComponent {
  loading = !true;
  isVisible = false;
  isOkLoading = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  vacancyLists = [
    {
      id: 1,
      title: 'Frontend Developer',
      description: 'Angular, React, NextJS, Javascript, Typescript',
      endDate: 'Son tarix 20.12.2025',
    },
    {
      id: 2,
      title: 'Backend Developer',
      description: 'NodeJS, NestJS, ExpressJS, MongoDB',
      endDate: 'Son tarix 02.12.2025',
    },
  ];

  applayVacancy(id: number): void {
    console.log(id);
    this.showModal();
  }
}
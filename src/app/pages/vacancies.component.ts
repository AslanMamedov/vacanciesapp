import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ApplayFormComponent, CDrawerComponent } from '#components';

@Component({
  selector: 'app-vacancies',
  standalone: true,
  imports: [
    NzIconModule,
    NzCardModule,
    FormsModule,
    NzAvatarModule,
    NzCardModule,
    NzIconModule,
    NzSkeletonModule,
    NzButtonModule,
    NzTypographyModule,
    NzButtonModule,
    NzIconModule,
    ApplayFormComponent,
    CDrawerComponent,
  ],
  template: `
    @for(vacancy of vacancyLists; track vacancy.id) {

    <nz-card class="w-full  h-[160px] mt-2" [nzLoading]="loading()">
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

    <app-c-drawer
      [isVisible]="isVisible()"
      (onCloseHandler)="onCloseHandler($event)"
    >
      <app-applay-form
        [id]="vacancyId()"
        [isVisible]="isVisible()"
      ></app-applay-form>
    </app-c-drawer>
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VacanciesComponent {
  public loading = signal<boolean>(false);
  public isVisible = signal<boolean>(false);
  protected router = inject<Router>(Router);
  public vacancyId = signal<number | string | null>(null);
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

  onCloseHandler($event: boolean): void {
    this.isVisible.set($event);
  }

  applayVacancy(id: number): void {
    this.isVisible.set(true);
    this.vacancyId.set(id);

  }
}

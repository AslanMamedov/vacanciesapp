import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { Router, RouterOutlet } from '@angular/router';
import { CTimerComponent } from '#components';
import { Store } from '@ngrx/store';
import { TimerActions, timerStartedSelector } from '#store/timer';
import { questionListLength, routeList } from '#constant';
import { userQuestionsRightCountSelector } from '#store';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    NzMenuModule,
    NzLayoutModule,
    NzCardModule,
    FormsModule,
    NzCardModule,
    NzSkeletonModule,
    NzButtonModule,
    NzFlexModule,
    NzTypographyModule,
    NzButtonModule,
    NzIconModule,
    RouterOutlet,
    CTimerComponent,
  ],
  template: `
    <nz-layout class="h-full">
      <nz-sider nzCollapsible [(nzCollapsed)]="isCollapsed" [nzTrigger]="null">
        <div class=" text-white text-center p-2">Vakansiya</div>
        <ul nz-menu nzTheme="dark" nzMode="inline">
          @for(link of routeList; track link.text) {
          <li
            nz-menu-item
            [nzSelected]="this.selectedRoute(link.link)"
            (click)="this.redirectRoute(link.link)"
          >
            <span nz-icon [nzType]="link.icon" nzTheme="outline"></span>
            <span> {{ link.text }} </span>
          </li>

          }
        </ul>
      </nz-sider>
      <nz-layout>
        <nz-header class="bg-white !p-0 !px-4">
          <div class="flex justify-between items-center h-[64px]">
            <button
              class="text-xl  hover:text-[#1890ff]"
              nz-icon
              [nzType]="isCollapsed() ? 'menu-unfold' : 'menu-fold'"
              (click)="toggleCollapsed()"
            ></button>
            @if(isStartTest()) {
            <app-c-timer></app-c-timer>
            } @if(!isStartTest()) {
            <div>{{ rightsCount() }}</div>

            }
          </div>
        </nz-header>
        <nz-content class="h-full !m-0 overflow-y-auto ">
          <router-outlet></router-outlet>
        </nz-content>
      </nz-layout>
    </nz-layout>
  `,
})
export class MainComponent {
  loading = signal<boolean>(!false);
  isCollapsed = signal<boolean>(false);
  isStartTest = signal<boolean>(false);
  currentUrl = signal<string>('');
  questionRightCount = signal<number>(0);
  routeList = routeList;
  router: Router = inject(Router);
  store = inject(Store);

  ngOnInit() {
    this.currentUrl.set(this.router.url);
  }

  timerEffect = effect(
    () => {
      this.store.select(timerStartedSelector).subscribe((result) => {
        this.isStartTest.set(result);
      });
    },
    {
      allowSignalWrites: true,
    }
  );

  testFinishedEffect = effect(
    () => {
      this.store.select(userQuestionsRightCountSelector).subscribe((result) => {
        this.questionRightCount.set(result || 0);
      });
    },
    {
      allowSignalWrites: true,
    }
  );

  rightsCount = computed(
    () => `${this.questionRightCount()} / ${questionListLength}`
  );

  selectedRoute(link: string): boolean {
    return this.currentUrl() === link;
  }

  redirectRoute(link: string): void {
    this.store.dispatch(TimerActions.timerFinished());
    this.router.navigate([link]);
  }

  toggleCollapsed(): void {
    this.isCollapsed.update((prev) => !prev);
  }
}

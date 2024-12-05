import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CTimerComponent } from '#components';

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
        <nz-header class="bg-white !p-0 !pl-4">
          <button
            class="text-xl  hover:text-[#1890ff]"
            nz-icon
            [nzType]="isCollapsed ? 'menu-unfold' : 'menu-fold'"
            (click)="isCollapsed = !isCollapsed"
          ></button>
        </nz-header>
        <nz-content class="h-full !m-0 overflow-y-auto ">
          <div class="p-4 border-red-400 border">
            <app-c-timer></app-c-timer>
          </div>
          <router-outlet></router-outlet>
        </nz-content>
      </nz-layout>
    </nz-layout>
  `,

  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  isCollapsed = false;
  loading = !true;
  currentUrl: string = '';

  routeList = [
    {
      text: 'Elanlar',
      link: '/',
      icon: 'notification',
    },
    {
      text: 'Şirkətlər',
      link: '/company',
      icon: 'profile',
    },
  ];
  router: Router = inject(Router);

  ngOnInit() {
    this.currentUrl = this.router.url;
  }

  selectedRoute(link: string): boolean {
    return this.currentUrl === link;
  }

  redirectRoute(link: string): void {
    this.router.navigate([link]);
  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}

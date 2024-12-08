import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
//--
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NzLayoutModule, RouterOutlet, NzIconModule, RouterLink],
  template: `
    <nz-layout class="min-h-screen">
      <nz-header
        class="bg-[#1890ff] fixed w-full z-50 text-center font-bold text-white text-2xl pt-4"
      >
        <a
          routerLink="/"
          nz-icon
          nzType="home"
          nzTheme="outline"
          class="flex items-center gap-4"
        >
          Vacancy
        </a>
      </nz-header>
      <nz-content class="p-4 mt-12 h-1/5">
        <router-outlet></router-outlet>
      </nz-content>
    </nz-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {}

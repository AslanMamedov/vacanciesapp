import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NzLayoutModule, RouterOutlet],
  template: `
    <nz-layout class="min-h-screen">
      <nz-header
        class="bg-[#1890ff] fixed w-full z-50 text-center font-bold text-white text-2xl pt-4"
        >Vacancy</nz-header
      >
      <nz-content class="p-4 mt-12">
        <router-outlet></router-outlet>
      </nz-content>
    </nz-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {}

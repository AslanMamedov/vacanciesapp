import { ChangeDetectionStrategy, Component } from '@angular/core';
//--
@Component({
  selector: 'app-notfound',
  standalone: true,
  template: ` <h1 class="text-9xl font-bold text-center ">* NOT FOUND</h1> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotfoundComponent {}

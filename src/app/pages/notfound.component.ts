import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-notfound',
  standalone: true,
  template: ` <h1>NOT FOUND</h1> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotfoundComponent {}

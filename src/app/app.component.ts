import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
//--
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {}

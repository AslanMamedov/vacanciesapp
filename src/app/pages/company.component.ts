import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [],
  template: `
    <p>
      company works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyComponent {

}

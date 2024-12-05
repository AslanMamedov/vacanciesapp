import { UserDataService } from '#services/user-data.service';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [],
  template: ` <p>result works!</p> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultComponent {
  public userDataService = inject(UserDataService);

  public ngOnInit(): void {
    console.log(this.userDataService.userDatra);
  }
}

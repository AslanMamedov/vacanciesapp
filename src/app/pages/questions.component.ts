import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplayFormComponent } from '../components/forms/applay-form.component';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [ApplayFormComponent],
  template: `<app-applay-form></app-applay-form> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionsComponent {
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  ngOnInit() {
    console.log(this.activeRoute.snapshot.params['id']);
  }
}

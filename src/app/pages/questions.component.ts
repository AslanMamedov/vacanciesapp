import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [],
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionsComponent {
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  ngOnInit() {
    console.log(this.activeRoute.snapshot.params['id']);
  }
}

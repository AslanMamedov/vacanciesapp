import { CStepsComponent } from '#components';
import { generateSteps } from '#utils/generateSteps';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CStepsComponent],
  template: `<app-c-steps [stepsSize]="stepsSize()"></app-c-steps>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionsComponent {
  protected stepsSize = signal<number[]>(generateSteps());
  public activeRoute: ActivatedRoute = inject(ActivatedRoute);
  protected router = inject<Router>(Router);
  ngOnInit() {
    const id = this.activeRoute.snapshot.params['id'];
    if (Number.isNaN(+id)) {
      this.router.navigate([''], { relativeTo: this.activeRoute });
    } else {
      console.log(Number(id));
    }
  }
}

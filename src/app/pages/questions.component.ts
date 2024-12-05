import { CStepsComponent } from '#components';
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
  template: `<app-c-steps [vacancyId]="vacancyId()"></app-c-steps>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionsComponent {
  public activeRoute: ActivatedRoute = inject(ActivatedRoute);
  public vacancyId = signal<number | null | string>(null);
  protected router = inject<Router>(Router);
  ngOnInit() {
    const id = this.activeRoute.snapshot.params['id'];
    if (Number.isNaN(+id)) {
      this.router.navigate([''], { relativeTo: this.activeRoute });
    } else {
      this.vacancyId.set(id);
    }
  }
}

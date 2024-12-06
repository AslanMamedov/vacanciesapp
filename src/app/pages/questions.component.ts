import { CStepsComponent } from '#components';
import { timerStartedSelector } from '#store/timer';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

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
  protected store = inject(Store);
  protected timerStarted = signal(false);

  timeFinishedEffect = effect(() => {
    this.store.select(timerStartedSelector).subscribe((result) => {
      if (!result) {
        this.router.navigate([`/${this.vacancyId()}/result`]);
      }
    });
  }, {});

  ngOnInit() {
    this.store
      .select(timerStartedSelector)
      .subscribe((result) => this.timerStarted.set(result));

    const id = this.activeRoute.snapshot.params['id'];
    if (!Number.isNaN(+id) && !this.timerStarted()) {
      this.router.navigate([''], { relativeTo: this.activeRoute });
    } else {
      this.vacancyId.set(id);
    }
  }
}

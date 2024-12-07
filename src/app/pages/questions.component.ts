import { HttpVacancyService } from '#services';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [],
  template: ` <p>questions works!</p> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionsComponent {
  protected vacancyService = inject(HttpVacancyService);
  protected activeRoute = inject(ActivatedRoute);
  ngOnInit() {
    const id: string = this.activeRoute.snapshot.params['id'];
    this.vacancyService
      .getQuestins(id)
      .pipe(
        catchError(() => {
          return EMPTY;
        })
      )
      .subscribe((data) => {
        console.log(data);
      });
  }
}

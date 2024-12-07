import { VacancyCardComponent } from '#components';
import { HttpVacancyService } from '#services';
import { IVacany } from '#types';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'app-vacancy-list',
  standalone: true,
  imports: [NzEmptyModule, NzSkeletonModule, VacancyCardComponent],
  template: `
    @if(loadingData()) { @for(i of generate(); track i) {
    <div class="w-full  h-[160px] mt-2 bg-white p-4">
      <nz-skeleton></nz-skeleton>
    </div>
    } } @else {
    <ng-container>
      @for(vacancy of vacancyList(); track vacancy.id) {
      <app-vacancy-card [vacancy]="vacancy"></app-vacancy-card>
      } @empty {
      <nz-empty
        class="mt-12"
        [nzNotFoundContent]="'Vacancy not found'"
      ></nz-empty>
      }
    </ng-container>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VacancyListComponent {
  vacancyService = inject(HttpVacancyService);
  vacancyList = signal<IVacany[]>([]);
  loadingData = signal(true);
  ngOnInit() {
    this.loadingData.set(true);
    this.vacancyService
      .getVacancies()
      .pipe(
        catchError(() => {
          return EMPTY;
        })
      )
      .subscribe((data) => {
        this.vacancyList.set(data as IVacany[]);
        this.loadingData.set(false);
      });
  }

  generate() {
    return Array.from({ length: 5 }, (_, index) => index + 1);
  }
}

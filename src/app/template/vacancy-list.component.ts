import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { catchError, EMPTY, Subscription } from 'rxjs';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { VacancyCardComponent } from '#components';
import { HttpVacancyService } from '#services';
import { IVacany } from '#types';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
//--

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
  protected subscription$: Subscription | null = null;
  protected vacancyList = signal<IVacany[]>([]);
  protected loadingData = signal<boolean>(true);
  //
  public vacancyService = inject(HttpVacancyService);
  //
  protected ngOnInit(): void {
    this.loadingData.set(true);
    this.subscription$ = this.vacancyService
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

  protected generate(): number[] {
    return Array.from({ length: 5 }, (_, index) => index + 1);
  }

  protected ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }
}

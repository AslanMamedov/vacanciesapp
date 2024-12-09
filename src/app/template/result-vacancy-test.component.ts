import { LoadingComponent, TableComponent, UploadComponent } from '#components';
import { ActivatedRoute } from '@angular/router';
import { HttpVacancyService, UserService } from '#services';
import { formatPhoneNumber } from '#utils';
import { DatePipe } from '@angular/common';
import { catchError, EMPTY, Subscription } from 'rxjs';
import {
  IVacancyResultData,
  IUserResultData,
  IAnswerQuestion,
  IPoinData,
} from '#types';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
//--

@Component({
  selector: 'app-result-vacancy-test',
  standalone: true,
  imports: [LoadingComponent, TableComponent, DatePipe, UploadComponent],
  template: ` @if(isLoading()) {
    <div class="flex items-center justify-center !min-h-[500px]">
      <app-loading></app-loading>
    </div>

    } @else {
    <div>
      <div class="flex gap-4 w-full justify-between my-3">
        <div class="border border-gray-500 flex-1 rounded-md">
          <div class="p-4">
            <span class="font-bold text-xl">{{ vacancyData()?.title }} </span>
            <br />
            <span>{{ vacancyData()?.description }}</span>
            <span class="block text-2xl"
              >Bitmə tarixi : {{ vacancyData()?.endDate | date : 'dd.MM.yyyy' }}
              <br />
            </span>
          </div>
          <div class="p-4">
            <span class="font-bold text-xl"
              >{{ userData()?.surname }} {{ userData()?.name }}</span
            >
            <span class="block text-2xl"
              >{{ userData()?.email }}
              <br />
            </span>
            <span class="text-2xl font-semibold">
              {{ userData()?.phoneNumberPrefix }}
              {{ userData()?.phoneNumber }}</span
            >
          </div>
        </div>
        <div
          class="border border-gray-500  flex-1 p-4  rounded-md flex flex-col gap-3"
        >
          <div>
            <span class="text-[#1890ff] font-bold text-3xl">
              Toplam bal : {{ pointData()?.point }}
            </span>
            <span class="text-[#1890ff] font-bold text-3xl">
              Sual : {{ pointData()?.questinCount }}
            </span>
            <span class="text-[#1890ff] font-bold text-3xl"
              >Cavab : {{ pointData()?.rightAnswer }}</span
            >
          </div>
          <div>
            <app-upload></app-upload>
          </div>
        </div>
      </div>
      <app-table [data]="tableData()"></app-table>
    </div>
    }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultVacancyTestComponent {
  public vacancyData = signal<IVacancyResultData | null>(null);
  public userData = signal<IUserResultData | null>(null);
  public pointData = signal<IPoinData | null>(null);
  public tableData = signal<IAnswerQuestion[]>([]);

  public isLoading = signal<boolean>(true);
  protected subscription$: Subscription | null = null;
  //
  protected vacancyService = inject(HttpVacancyService);
  protected activeRoute = inject(ActivatedRoute);
  protected userService = inject(UserService);
  //
  protected ngOnInit(): void {
    const id: string = this.activeRoute.snapshot.params['id'];
    const answerId: string = this.activeRoute.snapshot.params['resultId'];
    this.subscription$ = this.vacancyService
      .getUserAnswerVacancy(id, answerId)
      .pipe(
        catchError(() => {
          return EMPTY;
        })
      )
      .subscribe((data) => {
        this.isLoading.set(false);
        const userInfo = {
          ...data.userInfo,
          phoneNumber: formatPhoneNumber(data.userInfo.phoneNumber),
        };
        if (data.cvSended) {
          this.userService.cvSended();
        }
        this.vacancyData.set(data.aboutVacancy);
        this.tableData.set(data.answerQuestins);
        this.pointData.set(data.pointData);
        this.userData.set(userInfo);
      });
  }

  protected ngOnDestroy() {
    this.subscription$?.unsubscribe();
  }
}

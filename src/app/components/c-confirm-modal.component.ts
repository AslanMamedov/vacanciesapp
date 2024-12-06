import { TimerActions } from '#store/timer';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-c-confirm-modal',
  standalone: true,
  imports: [NzModalModule],
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CConfirmModalComponent {
  protected modal = inject<NzModalService>(NzModalService);
  public isShowConfirm = input.required<boolean>({
    alias: 'isShowConfirm',
  });
  public vacancyId = input.required<string | number | null>({
    alias: 'id',
  });
  public onClose = output<boolean>();
  protected router = inject<Router>(Router);
  protected store= inject(Store);
  showConfirm(): void {
    this.modal.confirm({
      nzTitle: '<i>Vakansiyaya müraciət etmək üçün testdən keçməlisiniz.</i>',
      nzContent:
        '<b>Test 15 dəqiqə ərzində tamamlanacaq və hər düzgün cavab 1 bal olaraq hesablanacaq.</b>',
      nzOnOk: () => {
        this.store.dispatch(TimerActions.timerStarted());

        this.router.navigate(['', this.vacancyId()]);
      },
      nzOkText: 'Testə başla',
      nzCancelText: null,
      nzOnCancel: () => this.onClose.emit(false),
    });
  }
  effect = effect(() => {
    if (this.isShowConfirm()) {
      this.showConfirm();
    }
  }, {});
}

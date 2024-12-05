import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import { Router } from '@angular/router';
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
  showConfirm(): void {
    this.modal.confirm({
      nzTitle: '<i>Vakansiya müraciat etmək üçun testdən keçməliziniz </i>',
      nzContent:
        '<b>Test 15 dəqiqə ərzində bitəcək və hər 1 düzgün sualın cavabı 1 bal olarag hesablanacaq</b>',
      nzOnOk: () => this.router.navigate(['', this.vacancyId()]),
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

import { UserService } from '#services';
import { ConfirmService } from '#services/confirm.service';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [NzModalModule],
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmComponent {
  protected router = inject<Router>(Router);
  protected modal = inject<NzModalService>(NzModalService);
  protected confirmService = inject(ConfirmService);
  protected userService = inject(UserService);

  showConfirm(): void {
    this.modal.confirm({
      nzTitle: '<i>Vakansiyaya müraciət etmək üçün testdən keçməlisiniz.</i>',
      nzContent:
        '<b>Test 15 dəqiqə ərzində tamamlanacaq və hər düzgün cavab 1 bal olaraq hesablanacaq.</b>',
      nzOnOk: () => {
        const id = this.userService.getVacancyId();
        this.router.navigate(['', id]);
      },
      nzOkText: 'Testə başla',
      nzCancelText: null,
    });
  }

  ngOnInit(): void {
    this.confirmService.confirmIsVisible.subscribe((visible) => {
      if (visible) {
        this.showConfirm();
      }
    });
  }
}

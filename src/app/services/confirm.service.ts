import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  confirmIsVisible = new BehaviorSubject<boolean>(false);
  onIsVisibleHanler() {
    this.confirmIsVisible.next(true);
  }

  onClose() {
    this.confirmIsVisible.next(false);
  }
}

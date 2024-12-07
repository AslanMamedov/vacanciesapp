import { computed, Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  dreawerIsVisible = new BehaviorSubject<boolean>(false);
  onIsVisibleHanler() {
    this.dreawerIsVisible.next(true);
  }

  onClose() {
    this.dreawerIsVisible.next(false);
  }
}

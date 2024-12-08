import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
//--
@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  public dreawerIsVisible = new BehaviorSubject<boolean>(false);
  public onIsVisibleHanler(): void {
    this.dreawerIsVisible.next(true);
  }

  public onClose(): void {
    this.dreawerIsVisible.next(false);
  }
}

import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  public timerisStarted = new BehaviorSubject<boolean>(false);
  protected localStorage = inject(LocalStorageService);
  onIsStartHandler() {
    this.timerisStarted.next(true);
    this.localStorage.setItem('endTime', Date.now() + 15 * 60 * 1000);
  }

  onTimeStart() {
    this.timerisStarted.next(true);
  }

  onStop() {
    this.timerisStarted.next(false);
  }
}

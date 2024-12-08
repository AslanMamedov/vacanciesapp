import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  public timerisStarted = new BehaviorSubject<boolean>(false);
  public timerFinished = new BehaviorSubject<boolean>(false);
  protected localStorage = inject(LocalStorageService);
  onIsStartHandler() {
    this.timerisStarted.next(true);
  }

  onTimeStart() {
    this.timerisStarted.next(true);
    this.timerFinished.next(false);
  }

  onStop() {
    this.timerisStarted.next(false);
  }

  onFinished() {
    this.timerFinished.next(true);
  }
}

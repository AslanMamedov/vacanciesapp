import { LocalStorageService } from './local-storage.service';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
//--
@Injectable({
  providedIn: 'root',
})
export class TimerService {
  public timerisStarted = new BehaviorSubject<boolean>(false);
  public timerFinished = new BehaviorSubject<boolean>(false);
  //
  protected localStorage = inject(LocalStorageService);
  public onIsStartHandler(): void {
    this.timerisStarted.next(true);
  }

  public onTimeStart(): void {
    this.timerisStarted.next(true);
    this.timerFinished.next(false);
  }

  public onStop(): void {
    this.timerisStarted.next(false);
  }

  public onFinished(): void {
    this.timerFinished.next(true);
  }
}

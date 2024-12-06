import { time } from '#constant';
import { TimerActions, timerStartedSelector } from '#store/timer';
import {
  Component,
  effect,
  inject,
  output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
@Component({
  selector: 'app-c-timer',
  standalone: true,
  imports: [NzGridModule, NzStatisticModule],
  template: `
    <nz-row [nzGutter]="16">
      <nz-col [nzSpan]="12">
        @if(isTimerRunning()) {
        <nz-countdown
          [nzValue]="deadline()"
          nzFormat="mm:ss"
          (nzCountdownFinish)="finish()"
        ></nz-countdown>

        }
      </nz-col>
    </nz-row>
  `,
})
export class CTimerComponent {
  public deadline = signal(time);
  public isTimerRunning = signal<boolean>(false);
  protected store = inject(Store);

  runnigTimerEffect = effect(
    () => {
      this.store.select(timerStartedSelector).subscribe((result) => {

        this.deadline.set(Date.now() + 1 * 60 * 1000);
        this.isTimerRunning.set(result);
      });
    },
    {
      allowSignalWrites: true,
    }
  );

  finish() {
    this.isTimerRunning.set(false);
    this.store.dispatch(TimerActions.timerFinished());
  }
}

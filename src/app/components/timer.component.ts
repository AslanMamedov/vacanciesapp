import { LocalStorageService } from '#services';
import { TimerService } from '#services/timer.service';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [NzGridModule, NzStatisticModule],
  template: `
    <nz-row [nzGutter]="16">
      <nz-col [nzSpan]="12">
        @if(timerStarted()) {
        <nz-countdown
          [nzValue]="deadline()"
          nzFormat="mm:ss"
          (nzCountdownFinish)="finish()"
        ></nz-countdown>
        }
      </nz-col>
    </nz-row>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerComponent {
  public deadline = signal(Date.now() + 1 * 60 * 1000);
  public timerService = inject(TimerService);
  protected localStorage = inject(LocalStorageService);
  public timerStarted = signal(false);
  public ngOnInit(): void {
    this.timerStarted.set(true);

    this.timerService.timerisStarted.subscribe((start) => {
      if (start) {
        this.deadline.set(Date.now() + 1 * 60 * 1000);
      }
    });
  }

  finish() {
    this.timerService.onFinished();
  }
}

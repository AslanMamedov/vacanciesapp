import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { TimerService } from './timer.service';

@Component({
  selector: 'app-c-timer',
  standalone: true,
  imports: [],
  template: ` <div>{{ timer() }}</div> `,

  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CTimerComponent {
  timerService = inject(TimerService);
  timer = this.timerService.timer;
  isStarted = this.timerService.isStarted;
  isRunning = this.timerService.isRunning;
  isFinished = this.timerService.isFinished;

  ngOnInit(): void {
    this.timerService.startTimer('15:00');
  }

  onStartHandler(time: string): void {
    this.timerService.startTimer(time);
  }

  onStopHandler(): void {
    this.timerService.stopTimer();
  }
}

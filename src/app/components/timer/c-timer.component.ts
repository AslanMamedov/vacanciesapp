import { Component, inject } from '@angular/core';
import { TimerService } from './timer.service';

@Component({
  selector: 'app-c-timer',
  standalone: true,
  template: ` <span class="text-3xl">{{ timer() }}</span> `,
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
}

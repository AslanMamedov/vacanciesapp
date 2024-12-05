import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  timer = signal('15:00');
  isStarted = signal(false);
  isRunning = signal(false);
  isFinished = signal(false);

  private intervalId: any;

  constructor() {}

  private parseTimeString(timeString: string): number {
    const [minutes, seconds] = timeString.split(':').map(Number);
    if (isNaN(minutes) || isNaN(seconds)) {
      throw new Error('Неверный формат времени. Используйте формат "мм:сс".');
    }
    if (minutes < 0 || seconds < 0 || minutes >= 60 || seconds >= 60) {
      throw new Error(
        'Неверное значение времени. Минуты и секунды должны быть в пределах 0-59.'
      );
    }
    return minutes * 60 + seconds;
  }

  private getTimeRemaining(deadline: Date): {
    total: number;
    minutes: number;
    seconds: number;
  } {
    const total = deadline.getTime() - new Date().getTime();
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return { total, minutes, seconds };
  }

  private setTime(deadline: Date): void {
    const { total, minutes, seconds } = this.getTimeRemaining(deadline);
    if (total >= 0) {
      this.timer.set(
        `${minutes > 9 ? minutes : '0' + minutes}:${
          seconds > 9 ? seconds : '0' + seconds
        }`
      );
      if (total === 0) {
        this.isFinished.set(true);
        this.isRunning.set(false);
      }
    } else {
      clearInterval(this.intervalId);
      this.isRunning.set(false);
    }
  }

  private getDeadTime(time: string): Date {
    const deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + this.parseTimeString(time));
    return deadline;
  }

  startTimer(time: string): void {
    this.isStarted.set(true);
    this.isRunning.set(true);
    this.isFinished.set(false);
    const deadline = this.getDeadTime(time);

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(() => {
      this.setTime(deadline);
    }, 1000);
  }

  stopTimer(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.isStarted.set(false);
    this.isRunning.set(false);
    this.isFinished.set(true);
  }
}

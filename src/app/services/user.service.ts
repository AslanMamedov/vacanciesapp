import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public vacancyId = new BehaviorSubject<string>('');

  setVacancyId(id: string): void {
    this.vacancyId.next(id);
  }

  getVacancyId(): string {
    return this.vacancyId.getValue();
  }
}

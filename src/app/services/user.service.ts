import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
//--
@Injectable({
  providedIn: 'root',
})
export class UserService {
  public vacancyId = new BehaviorSubject<string>('');
  public sendCv = new BehaviorSubject<boolean>(false);
  public setVacancyId(id: string): void {
    this.vacancyId.next(id);
  }

  public getVacancyId(): string {
    return this.vacancyId.getValue();
  }

  cvSended(): void {
    this.sendCv.next(true);
  }
}

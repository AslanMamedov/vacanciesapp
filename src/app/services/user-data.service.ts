import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  userDatra = null;
  vacancy = null;

  setUserData(data: any): void {
    this.userDatra = data;
  }

  setVacancyData(data: any): void {
    this.vacancy = data;
  }
}

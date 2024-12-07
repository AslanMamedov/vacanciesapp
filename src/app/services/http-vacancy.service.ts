import { API_URL } from '#constants';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpVacancyService {
  http = inject(HttpClient);

  getVacancies(): Observable<unknown> {
    return this.http.get(API_URL);
  }

  getQuestins(id: string): Observable<unknown> {
    return this.http.get(`${API_URL}/${id}`);
  }
}

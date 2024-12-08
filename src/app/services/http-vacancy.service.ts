import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IResult, IServerResponseData } from '#types';
import { API_URL } from '#constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpVacancyService {
  http = inject(HttpClient);

  getVacancies(): Observable<unknown> {
    return this.http.get(API_URL);
  }

  getQuestins(id: string): Observable<IServerResponseData> {
    return this.http.get<IServerResponseData>(`${API_URL}/${id}`);
  }

  applayVacancy(data: unknown, id: string) {
    return this.http.post<{ id: string }>(`${API_URL}/${id}`, { data, id }, {});
  }
  getUserAnswerVacancy(id: string, answerId: string): Observable<IResult> {
    return this.http.get<IResult>(`${API_URL}/${id}/${answerId}`);
  }

  applayCV(id: string, vacancyId: string, data: FormData) {
    return this.http.post(`${API_URL}/${id}/${vacancyId}/cv`, data);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Habitos } from '../model/habitos/habitos';

@Injectable({
  providedIn: 'root'
})
export class HabitosService {

  API = 'http://localhost:8080/api/habitos';

  constructor(private http: HttpClient) { }

  get(): Observable<any>{
    return this.http.get<any>(`${this.API}/get`);
  }

  post(habitos: Habitos): Observable<any> {
    return this.http.post(`${this.API}/nova`, habitos, { responseType: 'text' });
  }

}

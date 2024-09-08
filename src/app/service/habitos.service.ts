import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabitosService {

  API = 'http://localhost:8080/api/habitos';

  constructor(private http: HttpClient) { }

  get(): Observable<any>{
    return this.http.get<any>(`${this.API}/get`);
  }

}

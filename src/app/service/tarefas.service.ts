import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarefas } from '../model/tarefas/tarefas';
import { Tarefasrequest } from '../model/tarefas/dto/tarefasrequest';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {
  API = 'http://localhost:8080/api/tarefas';

  constructor(private http: HttpClient) { }

  get(): Observable<any>{
    return this.http.get<any>(`${this.API}/get`);
  }

  post(tarefasrequest: Tarefasrequest): Observable<any> {
    return this.http.post(`${this.API}/nova`, tarefasrequest, { responseType: 'text' });
  }

  put(id: number, concluido: boolean): Observable<any> {
    return this.http.put(`${this.API}/concluida/${id}?concluida=${concluido}`, null, { responseType: 'text' });
  }
  
  

}

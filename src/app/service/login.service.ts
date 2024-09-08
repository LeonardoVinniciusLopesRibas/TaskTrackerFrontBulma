import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuariorequest } from '../model/usuario/dto/usuariorequest';
import { Usuario } from '../model/usuario/usuario';

@Injectable({
  providedIn: 'root' // Certifica-se de que o serviço é fornecido globalmente
})
export class LoginService {
  API = 'http://localhost:8080/api/usuario';

  constructor(private http: HttpClient) { }

  logar(usuarioRequest: Usuariorequest): Observable<any> {
    return this.http.post<any>(`${this.API}/validasenha`, usuarioRequest);
  }

  get(): Observable<any>{
    return this.http.get<any>(`${this.API}/get`);
  }

  post(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.API}/novo`, usuario, { responseType: 'text' });
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.API}/delete/` + id, { responseType: 'text' });
  }
  
  
}

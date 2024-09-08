import { Component, inject, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from '../../service/login.service';
import { Usuariorequest } from '../../model/usuario/dto/usuariorequest';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../../model/usuario/usuario';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  usuarioRequest: Usuariorequest = new Usuariorequest();
  subscription: Subscription | undefined;
  router = inject(Router);
  usuario: Usuario = new Usuario();
  loginService = inject(LoginService);

  logar() {
    if (!this.usuarioRequest.usuario || this.usuarioRequest.usuario.trim().length === 0) {
      alert("Usuário não foi informado");
      return;
    }
    if (!this.usuarioRequest.senha || this.usuarioRequest.senha.trim().length === 0) {
      alert("Senha não foi informada");
      return;
    }

    this.subscription = this.loginService.logar(this.usuarioRequest).subscribe({
      next: (response: Usuario) => {
        alert('Login bem-sucedido');
        localStorage.setItem('usuario', JSON.stringify({
          id: response.id,
          nome: response.nome,
          email: response.email,
        }));
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        alert('Usuário ou senha incorretos');
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}

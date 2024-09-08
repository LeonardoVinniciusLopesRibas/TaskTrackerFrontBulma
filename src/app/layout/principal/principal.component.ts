import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})
export class PrincipalComponent {

  router = inject(Router);

  deslogar(){
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

}

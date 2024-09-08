import { Component, inject, NgModule, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { NgClass, NgFor, NgStyle } from '@angular/common';
import { Usuario } from '../../model/usuario/usuario';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [NgClass, NgFor, FormsModule, NgStyle],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  userService = inject(LoginService);
  users: any[] = [];
  isModalOpen = false; 
  novoUsuario: Usuario = {id: 0,  nome: '', email: '', senha: '' };

  constructor() { }

  ngOnInit() {
    this.getUsers(); 
  }

  getUsers() {
    this.userService.get().subscribe({
      next: (data) => {
        this.users = data; 
      },
      error: (err) => {
        console.error('Erro ao buscar usuários:', err);
      }
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.novoUsuario = {id: 0, nome: '', email: '', senha: '' }; 
  }

  cadastrarUsuario() {
    this.userService.post(this.novoUsuario).subscribe({
      next: (res) => {
        console.log('Usuário cadastrado com sucesso:', res);  
        this.getUsers();  
        this.closeModal();
      },
      error: (err) => {
        console.error('Erro ao cadastrar usuário:', err);
      }
    });
  }

  deletar(id: number){
    this.userService.delete(id).subscribe({
      next: (res) => {
        alert("Usuario deletado com sucesso")
        this.getUsers();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  
}

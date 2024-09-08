import { Component, inject, OnInit } from '@angular/core';
import { TarefasService } from '../../service/tarefas.service';
import { NgClass, NgFor, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tarefasrequest } from '../../model/tarefas/dto/tarefasrequest';

@Component({
  selector: 'app-tarefas',
  standalone: true,
  imports: [NgClass, NgFor, FormsModule, NgStyle],
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.scss']
})
export class TarefasComponent implements OnInit {

  tarefaService = inject(TarefasService);
  tarefas: any[] = [];
  showModal = false;
  novaTarefa = {
    descricao: '',
    dataInicio: '',
    dataFim: '',
    concluida: false
  };
  usuarioId: number | null = null; 
  tarefaRequest: Tarefasrequest = new Tarefasrequest();
  

  ngOnInit() {
    this.usuarioId = this.getUsuarioId(); 
    this.getTarefas();
  }
  

  getTarefas() {
    this.tarefaService.get().subscribe({
      next: (data) => {
        this.tarefas = data;
      },
      error: (err) => {
        console.error('Erro ao buscar tarefas:', err);
      }
    });
  }

  private resetTime(date: Date): Date {
    const newDate = new Date(date);
    newDate.setUTCHours(0, 0, 0, 0);
    return newDate;
  }
  
  getStatusClass(dataFim: string): string {
    const today = this.resetTime(new Date());
    const dataLimite = this.resetTime(new Date(dataFim));
  
    if (dataLimite < today) {
      return 'atrasada';
    } else if (dataLimite.getTime() === today.getTime()) {
      return 'vence-hoje';
    } else {
      return 'no-prazo';
    }
  }
  
  getStatusText(dataFim: string): string {
    const today = this.resetTime(new Date());
    const dataLimite = this.resetTime(new Date(dataFim));

  
    if (dataLimite < today) {
      return 'Atrasada';
    } else if (dataLimite.getTime() === today.getTime()) {
      return 'Vence hoje';
    } else {
      return 'Não atrasada';
    }
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.novaTarefa = { descricao: '', dataInicio: '', dataFim: '', concluida: false};
  }

  addTarefa() {
    if (this.usuarioId === null) {
      console.error('ID do usuário não encontrado.');
      return;
    }
  
    const tarefaRequest: Tarefasrequest = {
      descricao: this.novaTarefa.descricao,
      dataInicio: this.novaTarefa.dataInicio,
      dataFim: this.novaTarefa.dataFim,
      concluida: this.novaTarefa.concluida,
      usuarioId: this.usuarioId 
    };
  
    this.tarefaService.post(tarefaRequest).subscribe({
      next: (response) => {
        this.getTarefas();
        this.closeModal();
      },
      error: (err) => {
        console.error('Erro ao adicionar tarefa:', err);
      }
    });
  }
  

  private getUsuarioId(): number | null {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      try {
        const parsedUsuario = JSON.parse(usuario);
        return parsedUsuario.id ? parsedUsuario.id : null;
      } catch (e) {
        console.error('Erro ao parsear o usuário do localStorage:', e);
        return null;
      }
    }
    return null;
  }
  
  onCheckboxChange(event: Event, id: number): void {
    const checkbox = event.target as HTMLInputElement;
    const concluida = checkbox.checked;
  
    this.tarefaService.put(id, concluida).subscribe({
      next: (response) => {
        this.getTarefas();
      },
      error: (err) => {
        console.error('Erro ao atualizar o status da tarefa:', err);
      }
    });
  }
  

}

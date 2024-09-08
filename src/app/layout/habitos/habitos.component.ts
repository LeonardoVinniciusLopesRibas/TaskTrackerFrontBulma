import { NgFor } from '@angular/common';
import { Component, inject, NgModule, OnInit } from '@angular/core';
import { HabitosService } from '../../service/habitos.service';

@Component({
  selector: 'app-habitos',
  standalone: true,
  imports: [NgFor],
  templateUrl: './habitos.component.html',
  styleUrls: ['./habitos.component.scss']
})
export class HabitosComponent implements OnInit {

  habitos: any[] = [];
  habitosService = inject(HabitosService);
  daysOfMonth: number[] = [];
  currentMonth: number = new Date().getMonth();
  currentYear: number = new Date().getFullYear();

  ngOnInit() {
    this.getHabitos();
    this.generateDaysOfMonth();
  }

  getHabitos() {
    this.habitosService.get().subscribe({
      next: (data) => {
        this.habitos = data;
      },
      error: (err) => {
        console.error('Erro ao buscar hábitos:', err);
      }
    });
  }

  generateDaysOfMonth() {
    const date = new Date(this.currentYear, this.currentMonth + 1, 0);
    const daysInMonth = date.getDate();
    this.daysOfMonth = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }

  isHabitDone(habitId: number, day: number): boolean {
    return false;
  }

  toggleHabitDay(habitId: number, day: number): void {
  }

  isDayInMonth(day: number): boolean {
    return this.daysOfMonth.includes(day);
  }

  openModal() {
  }

  nextMonth() {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.generateDaysOfMonth();
  }

  getCurrentMonthYear(): string {
    return `${this.getMonthName(this.currentMonth)} ${this.currentYear}`;
  }

  getMonthName(monthIndex: number): string {
    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return months[monthIndex];
  }

  prevMonth() {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.generateDaysOfMonth();
  }
}

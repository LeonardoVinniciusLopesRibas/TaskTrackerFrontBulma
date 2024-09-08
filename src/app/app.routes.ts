import { Routes } from '@angular/router';
import { LoginComponent } from './layout/login/login.component';
import { PrincipalComponent } from './layout/principal/principal.component';
import { UsuarioComponent } from './layout/usuario/usuario.component';
import { TarefasComponent } from './layout/tarefas/tarefas.component';
import { HabitosComponent } from './layout/habitos/habitos.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent}, 
    {
        path: 'admin', component: PrincipalComponent,
        children: [
            {path: 'usuario', component:UsuarioComponent}, 
            {path: 'tarefas', component:TarefasComponent}, 
            {path: 'habitos', component:HabitosComponent}, 
        ]
    }
];

import { Usuario } from "../usuario/usuario";

export class Tarefas {

    id!: number;
    descricao!: string;
    dataInicio!: string;
    dataFim!: string;
    concluida!: boolean;
    usuario!: Usuario;

}

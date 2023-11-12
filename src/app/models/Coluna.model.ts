import { Tarefa } from "./Tarefa.model";

export class Coluna {
  id?: string;
  nome?: string;
  idQuadro?: string;
  tarefas?: Tarefa[];

  constructor(
    id: string,
    nome: string,
    idQuadro: string,
    tarefas: Tarefa[]
  ){
    this.id = id;
    this.nome = nome;
    this.idQuadro = idQuadro;
    this.tarefas = tarefas;
  }
}

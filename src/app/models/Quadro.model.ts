import { Coluna } from './Coluna.model';

export class Quadro {
  id?: string;
  nome?: string;
  idUsuario?: string;
  colunas?: Coluna[];

  constructor(
    id: string,
    nome: string,
    idUsuario: string,
    colunas: Coluna[]
  ){
    this.id = id;
    this.nome = nome;
    this.idUsuario = idUsuario;
    this.colunas = colunas;
  }
}

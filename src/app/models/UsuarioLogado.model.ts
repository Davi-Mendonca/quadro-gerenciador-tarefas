import { Quadro } from "./Quadro.model";

export class UsuarioLogado {

  id?: string;
  nome?: string;
  email?: string;
  telefone?: string;
  quadros?: Quadro[]
  quadroAtivo?: string;

  constructor(id: string, nome: string, email: string, telefone: string, senha: string, quadros: Quadro[]){
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
    this.quadros = quadros;
  }
}

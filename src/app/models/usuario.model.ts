export class Usuario {

  id?: string;
  nome?: string;
  email?: string;
  telefone?: string;
  senha?: string;

  constructor(nome: string, email: string, telefone: string, senha: string){
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
    this.senha = senha;
  }
}

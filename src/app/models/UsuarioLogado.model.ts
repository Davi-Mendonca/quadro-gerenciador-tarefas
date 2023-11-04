export class UsuarioLogado {

  id?: string;
  nome?: string;
  email?: string;
  telefone?: string;
  quadros?: any

  constructor(id: string, nome: string, email: string, telefone: string, senha: string){
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
  }
}

export class Tarefa {
  id?: string;
	titulo?: string;
	descricao?: string;
	dataParaConclusao?: Date;
	nivelPrioridade?: number;
	idColuna?: string;

  constructor(
    id?: string,
    titulo?: string,
    descricao?: string,
    dataConclusao?: Date,
    nivelPrioridade?: number,
    idColuna?: string
  ){
    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao;
    this.dataParaConclusao = dataConclusao;
    this.nivelPrioridade = nivelPrioridade;
    this.idColuna = idColuna
  }
}

import { AfterViewInit, Component, OnInit } from '@angular/core';
import { GerenciadorTarefasService } from 'src/app/service/gerenciador-tarefas.service';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state/app.state';
import { UsuarioLogado } from 'src/app/models/UsuarioLogado.model';
import { NomeNovoElementoModalComponent } from '../modais/nome-novo-elemento-modal/nome-novo-elemento-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import * as UsuarioActions from '../../store/action/usuarioLogado.actions';
import { Coluna } from 'src/app/models/Coluna.model';
import { NovaTarefaModalComponent } from '../modais/nova-tarefa-modal/nova-tarefa-modal.component';
import { Tarefa } from 'src/app/models/Tarefa.model';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.scss']
})
export class PaginaInicialComponent implements OnInit, AfterViewInit {
  usuarioLogado: UsuarioLogado | null = null;
  nomeNovoQuadro: string = "";
  nomeNovaColuna: string = "";

  abaAtiva!: string;

  constructor(
    private service: GerenciadorTarefasService,
    private store: Store<AppState>,
    private dialog: MatDialog,
    private tabs: MatTabsModule
  ) { }

  ngAfterViewInit(): void {
    this.store.dispatch(UsuarioActions.quadroAtivo({ quadroAtivo: this.pegarAbaAtiva() ?? '' }));
  }

  ngOnInit(): void {
    this.store.pipe(select(state => state.usuarioLogado))
      .subscribe((usuario) => {
        // console.log('Usuario atualizado:', usuario);
        this.usuarioLogado = usuario;
      })
  }

  pegarAbaAtiva() {
    return document.querySelectorAll('.mat-mdc-tab-body-wrapper .board')[0].getAttribute('id');
  }

  pegarPrimeiroNome() {
    return this.usuarioLogado?.nome?.split(" ")[0]
  }

  novoQuadro() {
    const dialogRef = this.dialog.open(NomeNovoElementoModalComponent, {
      data: {
        textoModal: "Nome do novo quadro",
        nomeRecebido: this.nomeNovoQuadro
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.nomeNovoQuadro = result;
        this.service.cadastrarQuadro(
          {
            nome: result,
            idUsuario: this.usuarioLogado?.id
          }
        ).subscribe((response) => {
          console.log('Novo quadro: ', response)
          this.store.dispatch(UsuarioActions.novoQuadro({ quadro: response }));
          this.store.pipe(select(state => state.usuarioLogado))
            .subscribe((usuario) => {
              console.log('Criou novo quadro: ', usuario);
              this.usuarioLogado = usuario;
            })
        })
      }
    });
  }

  novaColuna() {
    this.nomeNovaColuna = '';

    const dialogRef = this.dialog.open(NomeNovoElementoModalComponent, {
      data: {
        textoModal: "Nome da nova coluna",
        nomeRecebido: this.nomeNovaColuna
      }
    });

    let aba = this.pegarAbaAtiva();
    if (aba) this.abaAtiva = aba;

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.nomeNovaColuna = result;
        console.log("aba ativa: ", this.abaAtiva)
        this.service.cadastrarColuna(
          {
            nome: result,
            idQuadro: this.abaAtiva
          }
        ).subscribe((response: Coluna) => {
          this.store.dispatch(UsuarioActions.novaColuna({
            idQuadro: this.abaAtiva,
            coluna: response
          }));
        });
      }
    });
  }

  novaTarefa() {
  console.log('Nova tarefa...')

    const dialogRef = this.dialog.open(NovaTarefaModalComponent, {
      data: {
        id: '',
        titulo: '',
        descricao: '',
        dataParaConclusao: null,
        nivelPrioridade: 1,
        idColuna: ''
      }
    });

    dialogRef.afterClosed().subscribe(formulario => {
      if (formulario) {
        console.log('Formulário: ', {
          titulo: formulario.value.titulo,
          descricao: formulario.value.descricao,
          dataParaConclusao: formulario.value.dataParaConclusao,
          nivelPrioridade: formulario.value.nivelPrioridade
        })
        let idColuna: string | undefined;

        const quadroAtivo = this.usuarioLogado?.quadros?.find(
          quadro => quadro.id === this.usuarioLogado?.quadroAtivo
        );
        console.log('Quadro ativo: ', this.usuarioLogado?.quadroAtivo)
        if (quadroAtivo && quadroAtivo.colunas?.length) {
          idColuna = quadroAtivo.colunas[0].id;
        }

        let tarefa: Tarefa = {
          titulo: formulario.value.titulo,
          descricao: formulario.value.descricao,
          dataParaConclusao: formulario.value.dataParaConclusao,
          nivelPrioridade: formulario.value.nivelPrioridade,
          idColuna: idColuna
        }

        console.log('cadastrar tarefa: ', tarefa)
        let result = this.service.cadastrarTarefa(tarefa)
          .subscribe(response => {
            this.store.dispatch(UsuarioActions.novaTarefa({
              idQuadro: this.usuarioLogado?.quadroAtivo ?? '',
              idColuna: idColuna ?? '',
              tarefa: response
            }));
          });

        console.log('result: ', result)
      }
    });
  }
}

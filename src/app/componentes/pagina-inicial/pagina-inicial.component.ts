import { Component, OnInit } from '@angular/core';
import { GerenciadorTarefasService } from 'src/app/service/gerenciador-tarefas.service';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state/app.state';
import { UsuarioLogado } from 'src/app/models/UsuarioLogado.model';
import { NomeNovoElementoModalComponent } from '../modais/nome-novo-elemento-modal/nome-novo-elemento-modal.component';
import { MatDialog } from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.scss']
})
export class PaginaInicialComponent implements OnInit {
  usuarioLogado: UsuarioLogado | null = null;
  nomeNovoQuadro: string = "";
  nomeNovaColuna: string = ""

  constructor(
    private service: GerenciadorTarefasService,
    private store: Store<AppState>,
    private dialog: MatDialog,
    private tabs: MatTabsModule
  ){}

  ngOnInit(): void {
    this.store.pipe(select(state => state.usuarioLogado))
      .subscribe((usuario) => {
        console.log('Usuario atualizado:', usuario);
        this.usuarioLogado = usuario;
      })
  }

  pegarPrimeiroNome() {
    return this.usuarioLogado?.nome?.split(" ")[0]
  }

  async novoQuadro() {
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
            nome: this.nomeNovoQuadro,
            idUsuario: this.usuarioLogado?.id
          }
        )
      }
    });
  }

  async novaColuna() {
    const dialogRef = this.dialog.open(NomeNovoElementoModalComponent, {
      data: {
          textoModal: "Nome da nova coluna",
          nomeRecebido: this.nomeNovoQuadro
        },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.nomeNovoQuadro = result;
        this.service.cadastrarColuna(
          {
            nome: this.nomeNovoQuadro,
            idUsuario: this.usuarioLogado?.id
          }
        )
      }
    });
  }
}

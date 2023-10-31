import { Component, OnInit } from '@angular/core';
import { GerenciadorTarefasService } from 'src/app/service/gerenciador-tarefas.service';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state/app.state';
import { UsuarioLogado } from 'src/app/models/UsuarioLogado.model';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.scss']
})
export class PaginaInicialComponent implements OnInit {
  usuarioLogado: UsuarioLogado | null = null;

  constructor(
    private service: GerenciadorTarefasService,
    private store: Store<AppState>
  ){}

  ngOnInit(): void {
    this.store.pipe(select(state => state.usuarioLogado))
      .subscribe((usuario) => {
        console.log('Usuario atualizado:', usuario);
        this.usuarioLogado = usuario;
      })
  }

  async novoQuadro() {
    await this.service.cadastrarQuadro(
      {
        nome: "Novo quadro",
        idUsuario: this.usuarioLogado?.id
      }
    )
  }
}

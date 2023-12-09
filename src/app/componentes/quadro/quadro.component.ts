import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UsuarioLogado } from 'src/app/models/UsuarioLogado.model';
import { AppState } from 'src/app/store/app.reducer';
import { GerenciadorTarefasService } from 'src/app/service/gerenciador-tarefas.service';
import { MatDialog } from '@angular/material/dialog';
import * as UsuarioActions from '../../store/action/usuarioLogado.actions'
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-quadro',
  templateUrl: './quadro.component.html',
  styleUrls: ['./quadro.component.scss']
})
export class QuadroComponent implements OnInit {
  usuarioLogado: UsuarioLogado | null = null;
  nomeNovaColuna: string = "";
  @Input() abaAtiva: any;
  @Input() quadroAtivo: any;

  constructor(
    private service: GerenciadorTarefasService,
    private store: Store<AppState>,
    private dialog: MatDialog,
  ){}

  ngOnInit(): void {
    this.store.pipe(select(state => state.usuarioLogado))
      .subscribe((usuario) => {
        this.usuarioLogado = usuario;
      })
  }

  onTabChange() {
    let abaAtiva = document.querySelector('.mat-mdc-tab-body-active .board')?.getAttribute('id');
    if (abaAtiva) {
      this.store.dispatch(UsuarioActions.quadroAtivo({quadroAtivo: abaAtiva}));
    }
  }
}

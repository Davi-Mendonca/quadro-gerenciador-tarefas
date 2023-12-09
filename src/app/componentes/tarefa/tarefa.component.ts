import { Component, Input, OnInit } from '@angular/core';
import { NovaTarefaModalComponent } from '../modais/nova-tarefa-modal/nova-tarefa-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioLogado } from 'src/app/models/UsuarioLogado.model';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state/app.state';
import * as UsuarioActions from '../../store/action/usuarioLogado.actions';
import { Tarefa } from 'src/app/models/Tarefa.model';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.scss']
})
export class TarefaComponent implements OnInit{
  @Input() titulo?: string
  @Input() descricao?: string
  @Input() dataParaConclusao?: Date
  @Input() nivelPrioridade?: number
  @Input() idTarefa?: string

  usuarioLogado: UsuarioLogado | null = null;

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>
  ){}

  ngOnInit(): void {
    this.store.pipe(select(state => state.usuarioLogado))
      .subscribe((usuario) => {
        this.usuarioLogado = usuario;
      })
  }

  editarTarefa(element: any) {
    console.log('tarefa: ', element['idTarefa']);

    let idTarefa = element['idTarefa'];
    let tarefaElement = document.getElementById(idTarefa);
    let idColuna = tarefaElement?.closest('.taks-container')?.getAttribute('data-idColuna');

    let tarefa: any;

    this.usuarioLogado?.quadros?.map(quadro => {
      if(quadro.id == this.usuarioLogado?.quadroAtivo) {
        quadro.colunas?.map(coluna => {
          if (coluna.id == idColuna) {
            tarefa = coluna.tarefas?.find(tarefa => tarefa.id == idTarefa);
          }
        })
      }
    })

    const dialogRef = this.dialog.open(NovaTarefaModalComponent, {
      data: {
        id: tarefa.id,
        titulo: tarefa.titulo,
        descricao: tarefa.descricao,
        dataParaConclusao: tarefa.dataParaConclusao,
        nivelPrioridade: tarefa.nivelPrioridade
      }
    })
  }
}

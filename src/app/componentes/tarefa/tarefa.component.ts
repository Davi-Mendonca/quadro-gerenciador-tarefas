import { Component, Input, OnInit } from '@angular/core';
import { NovaTarefaModalComponent } from '../modais/nova-tarefa-modal/nova-tarefa-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioLogado } from 'src/app/models/UsuarioLogado.model';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state/app.state';
import * as UsuarioActions from '../../store/action/usuarioLogado.actions';
import { Tarefa } from 'src/app/models/Tarefa.model';
import { GerenciadorTarefasService } from 'src/app/service/gerenciador-tarefas.service';
import { firstValueFrom } from 'rxjs';
import { ErroModalComponent } from '../modais/erro-modal/erro-modal.component';
import { ConfirmacaoModalComponent } from '../modais/confirmacao-modal/confirmacao-modal.component';

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
    private store: Store<AppState>,
    private service: GerenciadorTarefasService
  ){}

  ngOnInit(): void {
    this.store.pipe(select(state => state.usuarioLogado))
      .subscribe((usuario) => {
        this.usuarioLogado = usuario;
      })
  }

  editarTarefa(element: any) {
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
        titulo: tarefa.titulo,
        descricao: tarefa.descricao,
        dataParaConclusao: tarefa.dataParaConclusao,
        nivelPrioridade: tarefa.nivelPrioridade
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        const { titulo, descricao, dataParaConclusao, nivelPrioridade} = result.value;
        const data = {
          id: idTarefa,
          titulo: titulo,
          descricao: descricao,
          dataParaConclusao: dataParaConclusao,
          nivelPrioridade: nivelPrioridade
        }
        firstValueFrom(this.service.atualizarTarefa(idTarefa, data))
          .then(response => {
            this.store.dispatch(UsuarioActions.atualizarTarefa({
              quadroAtivo: this.usuarioLogado?.quadroAtivo ?? '',
              idColuna: idColuna ?? '',
              data: data
            }))
          }).catch(error => {
            console.log('Erro ao atualizar tarefa.');
            this.dialog.open(ErroModalComponent, {
              data: {
                titulo: 'Atualizar tarefa',
                descricao: 'Algo deu errado, não foi possível atualizar a tarefa.'
              }
            })
          })
      };
    })
  }

  excluirTarefa(element: any) {
    let idTarefa = element['idTarefa'];
    let tarefaElement = document.getElementById(idTarefa);
    let idColuna = tarefaElement?.closest('.taks-container')?.getAttribute('data-idColuna');

    const dialogRef = this.dialog.open(ConfirmacaoModalComponent, {
      data: {
        titulo: 'Excluir tarefa',
        descricao: 'Deseja realmente excluir a tarefa?'
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          firstValueFrom(this.service.deletarTarefa(idTarefa))
            .then(response => {
              this.store.dispatch(UsuarioActions.excluirTarefa({
                quadroAtivo: this.usuarioLogado?.quadroAtivo ?? '',
                idColuna: idColuna ?? '',
                idTarefa: idTarefa
              }))
            }).catch(error => {
              console.log('Erro ao excluir tarefa.', error);
              this.dialog.open(ErroModalComponent, {
                data: {
                  titulo: 'Excluir tarefa',
                  descricao: 'Algo deu errado, não foi possível excluir a tarefa.'
                }
              })
            });
        }
      });
  }
}

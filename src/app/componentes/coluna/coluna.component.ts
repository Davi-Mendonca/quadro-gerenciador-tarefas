import { UsuarioLogado } from './../../models/UsuarioLogado.model';
import { quadroAtivo } from './../../store/action/usuarioLogado.actions';
import { Component, ElementRef, Input, SimpleChanges, Renderer2, OnDestroy, OnInit } from '@angular/core';
import { Coluna } from 'src/app/models/Coluna.model';
import { Tarefa } from 'src/app/models/Tarefa.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { GerenciadorTarefasService } from 'src/app/service/gerenciador-tarefas.service';
import { Subject, catchError, takeUntil, firstValueFrom } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';
import { Store, select } from '@ngrx/store';
import * as UsuarioActions from '../../store/action/usuarioLogado.actions';
import { MatDialog } from '@angular/material/dialog';
import { EditarNomeElementoModalComponent } from '../modais/editar-nome-elemento-modal/editar-nome-elemento-modal.component';
import { ConfirmacaoModalComponent } from '../modais/confirmacao-modal/confirmacao-modal.component';
import { Quadro } from 'src/app/models/Quadro.model';
import { ErroModalComponent } from '../modais/erro-modal/erro-modal.component';

@Component({
  selector: 'app-coluna',
  templateUrl: './coluna.component.html',
  styleUrls: ['./coluna.component.scss']
})
export class ColunaComponent implements OnDestroy, OnInit{
  primeiroFilho: boolean = false
  @Input() nomeColuna?: string;
  @Input() idColuna?: string;
  @Input() tarefas: Tarefa[] | undefined;
  private destroy$ = new Subject<void>();
  usuarioLogado: UsuarioLogado | null = null;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private service: GerenciadorTarefasService,
    private dialog: MatDialog,
    private store: Store<AppState>
  ) {}

    ngOnInit(): void {
        this.store.pipe(select(state => state.usuarioLogado))
        .subscribe(usuario => {
          this.usuarioLogado = usuario;
        });
    }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tarefas']) {
      this.tarefas = [...this.tarefas || []];
    }
  }

  ngAfterViewInit() {
    const nativeElement = this.el.nativeElement;
    const taskContainer = nativeElement.querySelector('.taks-container');

    this.primeiroFilho = nativeElement.parentElement.firstChild === nativeElement;

    if (taskContainer) {
      this.renderer.setAttribute(taskContainer, 'data-idcoluna', this.idColuna || '');
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  editarColuna(element: any): void {
    console.log('elemento: ', element['idColuna']);

    const dialogRef = this.dialog.open(EditarNomeElementoModalComponent, {
      data: {
        textoModal: "Nome da coluna",
        nomeRecebido: this.nomeColuna
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          firstValueFrom(this.service.atualizarColuna(element['idColuna'], result))
          .then(response => {
            this.store.dispatch(UsuarioActions.renomearColuna({
              quadroAtivo: this.usuarioLogado?.quadroAtivo ?? '',
              idColuna: element['idColuna'],
              nomeColuna: result
            }));
            console.log('state atualizado: ', this.usuarioLogado);
          }).catch(error => {
            console.log('Erro ao atualizar coluna', error);
            this.dialog.open(ErroModalComponent, {
              data: {
                titulo: 'Erro ao renomear coluna',
                descricao: 'Algo deu errado, não foi possível renomear a coluna.'
              }
            })
          })
        }
      });
  }

  excluirColuna(element: any): void {
    const dialogRef = this.dialog.open(ConfirmacaoModalComponent, {
      data: {
        titulo: 'Excluir coluna',
        descricao: `Deseja realmente excluir a coluna '${this.nomeColuna}'?`
      }
    })

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          let colunaVazia;
          this.usuarioLogado?.quadros?.map(quadro => {
            if (quadro.id === this.usuarioLogado?.quadroAtivo) {
              quadro.colunas?.map(coluna => {
                if (coluna.id === element['idColuna']) {
                  if (coluna.tarefas?.length) {
                    colunaVazia = false
                  } else {
                    colunaVazia = true
                  }
                }
                return;
              })
            }
          })
          if (colunaVazia) {
            firstValueFrom(this.service.deletarColuna(element['idColuna']))
              .then(response => {
                this.store.dispatch(UsuarioActions.excluirColuna({
                  quadroAtivo: this.usuarioLogado?.quadroAtivo ?? '',
                  idColuna: element['idColuna']
                }));
              }).catch(error => {
                // Implementar modal de erro ao ecluir
                console.log('Erro ao excluir coluna: ', error);
              })
          } else {
            const dialogRef = this.dialog.open(ErroModalComponent, {
              data: {
                titulo: 'Não é possível exluir a coluna',
                descricao: `A coluna '${this.nomeColuna}' ainda possui tarefas. Mova ou exclua as tarefas antes de tentar excluir a coluna.`
              }
            })
            console.log('A coluna ainda possui tarefas.\nNão é possível excluir.')
          }
        }
      });
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      let colunaSaida = event.previousContainer.element.nativeElement.getAttribute("data-idcoluna");
      let colunaEntrada = event.container.element.nativeElement.getAttribute("data-idcoluna");
      let tarefa = event.item.element.nativeElement.getAttribute("id");

      if (colunaSaida && colunaEntrada && tarefa) {
        firstValueFrom(this.service.moverTarefa(colunaEntrada, tarefa))
          .then(Response => {
            this.store.dispatch(UsuarioActions.moverTarefa({
              quadroAtivo: this.usuarioLogado?.quadroAtivo ?? '',
              colunaSaida: colunaSaida ?? '',
              colunaEntrada: colunaEntrada ?? '',
              tarefaMov: tarefa ?? ''
            }))
          }).catch(error => {
            console.log('Erro ao mover tarefa: ', error);
            this.dialog.open(ErroModalComponent, {
              data: {
                titulo: 'Erro ao mover tarefa',
                descricao: 'Algo deu errado, não foi possível mover a tarefa.'
              }
            });
          })
      }
    }
  }
}

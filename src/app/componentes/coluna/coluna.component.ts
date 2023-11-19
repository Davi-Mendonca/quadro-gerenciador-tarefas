import { UsuarioLogado } from './../../models/UsuarioLogado.model';
import { quadroAtivo } from './../../store/action/usuarioLogado.actions';
import { Component, ElementRef, Input, SimpleChanges, Renderer2, OnDestroy, OnInit } from '@angular/core';
import { Coluna } from 'src/app/models/Coluna.model';
import { Tarefa } from 'src/app/models/Tarefa.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { GerenciadorTarefasService } from 'src/app/service/gerenciador-tarefas.service';
import { Subject, catchError, takeUntil } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';
import { Store, select } from '@ngrx/store';
import * as UsuarioActions from '../../store/action/usuarioLogado.actions';

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
        this.service.atualizarTarefa(colunaEntrada, tarefa).pipe(
          takeUntil(this.destroy$),
          catchError(error => {
            throw error;
          })
        ).subscribe(response => {
          this.store.dispatch(UsuarioActions.atualizarTarefa({
            quadroAtivo: this.usuarioLogado?.quadroAtivo ?? '',
            colunaSaida: colunaSaida ?? '',
            colunaEntrada: colunaEntrada ?? '',
            tarefa: tarefa ?? ''
          }))
        });
      }
    }
  }
}

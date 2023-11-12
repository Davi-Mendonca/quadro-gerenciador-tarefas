import { Component, ElementRef, Input } from '@angular/core';
import { Tarefa } from 'src/app/models/Tarefa.model';

@Component({
  selector: 'app-coluna',
  templateUrl: './coluna.component.html',
  styleUrls: ['./coluna.component.scss']
})
export class ColunaComponent {
  primeiroFilho: boolean = false
  @Input() nomeColuna?: string = '';
  @Input() tarefas: Tarefa[] | undefined

  constructor(private el: ElementRef) {}


  ngAfterViewInit() {

    const nativeElement = this.el.nativeElement;

    this.primeiroFilho = nativeElement.parentElement.firstChild === nativeElement;
  }

}

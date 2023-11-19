import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.scss']
})
export class TarefaComponent {
  @Input() titulo?: string
  @Input() descricao?: string
  @Input() dataParaConclusao?: Date
  @Input() nivelPrioridade?: number
  @Input() idTarefa?: string
}

import { state } from '@angular/animations';
import { AppState } from './../../../store/state/app.state';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { Tarefa } from 'src/app/models/Tarefa.model';
import { UsuarioLogado } from 'src/app/models/UsuarioLogado.model';
import { GerenciadorTarefasService } from 'src/app/service/gerenciador-tarefas.service';
import * as UsuarioActions from '../../../store/action/usuarioLogado.actions';
import { DateAdapter } from '@angular/material/core';

interface select {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-nova-tarefa-modal',
  templateUrl: './nova-tarefa-modal.component.html',
  styleUrls: ['./nova-tarefa-modal.component.scss']
})
export class NovaTarefaModalComponent{
  selectedValue: number = 1

  options: select[] = [
    {value: 1, viewValue: '1'},
    {value: 2, viewValue: '2'},
    {value: 3, viewValue: '3'},
    {value: 4, viewValue: '4'},
    {value: 5, viewValue: '5'},
  ];

  constructor(
    public dialogRef: MatDialogRef<NovaTarefaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public formulario: Tarefa,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('en-GB');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(formulario: any) {
    formulario.value.dataParaConclusao = formulario.value.dataParaConclusao.toISOString()
    this.dialogRef.close(formulario);
  }
}

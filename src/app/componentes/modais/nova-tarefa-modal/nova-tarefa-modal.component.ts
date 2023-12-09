import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { select } from '@ngrx/store';
import { Tarefa } from 'src/app/models/Tarefa.model';
import { DateAdapter } from '@angular/material/core';
import { NgForm } from '@angular/forms';

interface select {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-nova-tarefa-modal',
  templateUrl: './nova-tarefa-modal.component.html',
  styleUrls: ['./nova-tarefa-modal.component.scss']
})
export class NovaTarefaModalComponent implements OnInit{
  selectedValue: number | undefined

  options: select[] = [
    {value: 1, viewValue: '1'},
    {value: 2, viewValue: '2'},
    {value: 3, viewValue: '3'},
    {value: 4, viewValue: '4'},
    {value: 5, viewValue: '5'},
  ];

  constructor(
    public dialogRef: MatDialogRef<NovaTarefaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public tarefa: Tarefa,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit(): void {
    console.log('tarefa: ', this.tarefa)
    this.selectedValue = this.tarefa.nivelPrioridade;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(formulario: NgForm) {
    if (formulario.valid) {
      formulario.value.dataParaConclusao = formulario.value.dataParaConclusao.toISOString()
      this.dialogRef.close(formulario);
    }
  }
}

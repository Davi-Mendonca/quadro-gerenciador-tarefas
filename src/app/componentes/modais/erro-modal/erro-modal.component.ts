import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-erro-modal',
  templateUrl: './erro-modal.component.html',
  styleUrls: ['./erro-modal.component.scss']
})
export class ErroModalComponent {
  titulo: string = ''
  descricao: string = ''

  constructor(
    public dialogRef: MatDialogRef<ErroModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){
    this.titulo = data.titulo,
    this.descricao = data.descricao
  }
}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacao-modal',
  templateUrl: './confirmacao-modal.component.html',
  styleUrls: ['./confirmacao-modal.component.scss']
})
export class ConfirmacaoModalComponent {
  titulo: string = ''
  descricao: string = ''

  constructor(
    public dialogRef: MatDialogRef<ConfirmacaoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.titulo = data.titulo,
    this.descricao = data.descricao
  }

  onClose(excluir: boolean) {
    this.dialogRef.close(excluir);
  }
}

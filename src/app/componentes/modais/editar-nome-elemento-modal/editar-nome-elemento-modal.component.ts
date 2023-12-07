import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConteudoModal } from 'src/app/models/conteudoModal.model';

@Component({
  selector: 'app-editar-nome-elemento-modal',
  templateUrl: './editar-nome-elemento-modal.component.html',
  styleUrls: ['./editar-nome-elemento-modal.component.scss']
})
export class EditarNomeElementoModalComponent {
  nomeElemento: string = "";

  constructor(
    public dialogRef: MatDialogRef<EditarNomeElementoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConteudoModal,
  ) {}

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

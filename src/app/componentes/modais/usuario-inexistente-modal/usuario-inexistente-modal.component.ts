import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-usuario-inexistente-modal',
  templateUrl: './usuario-inexistente-modal.component.html',
  styleUrls: ['./usuario-inexistente-modal.component.scss']
})
export class UsuarioInexistenteModalComponent {
  constructor(public dialogRef: MatDialogRef<UsuarioInexistenteModalComponent>) {}

  seguirParaCadastro(resposta: boolean) {
    this.dialogRef.close(resposta)
  }
}

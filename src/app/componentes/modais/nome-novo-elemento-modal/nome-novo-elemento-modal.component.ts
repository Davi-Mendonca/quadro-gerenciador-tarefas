import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConteudoModal } from 'src/app/models/conteudoModal.model';

@Component({
  selector: 'app-nome-novo-elemento-modal',
  templateUrl: './nome-novo-elemento-modal.component.html',
  styleUrls: ['./nome-novo-elemento-modal.component.scss'],
})
export class NomeNovoElementoModalComponent implements OnInit {
  nomeElemento: string = "";

  constructor(
    public dialogRef: MatDialogRef<NomeNovoElementoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConteudoModal,
  ) {}

  ngOnInit(): void {
    console.log(this.data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

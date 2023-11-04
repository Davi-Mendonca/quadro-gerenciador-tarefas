import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UsuarioLogado } from 'src/app/models/UsuarioLogado.model';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-quadro',
  templateUrl: './quadro.component.html',
  styleUrls: ['./quadro.component.scss']
})
export class QuadroComponent implements OnInit{
  usuarioLogado: UsuarioLogado | null = null;

  constructor(private store: Store<AppState>){}

  ngOnInit(): void {
    this.store.pipe(select(state => state.usuarioLogado))
      .subscribe((usuario) => {
        console.log('Usuario atualizado:', usuario);
        this.usuarioLogado = usuario;
      })
  }
}

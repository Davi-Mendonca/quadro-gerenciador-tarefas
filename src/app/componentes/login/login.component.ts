import { Component, OnInit } from '@angular/core';
import { GerenciadorTarefasService } from 'src/app/service/gerenciador-tarefas.service';
import { SenhaIncorretaModalComponent } from '../modais/senha-incorreta-modal/senha-incorreta-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UsuarioInexistenteModalComponent } from '../modais/usuario-inexistente-modal/usuario-inexistente-modal.component';
import { AppState } from 'src/app/store/state/app.state';
import { Store } from '@ngrx/store';
import * as UsuarioActions from '../../store/action/usuarioLogado.actions'
import { ErroModalComponent } from '../modais/erro-modal/erro-modal.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private service: GerenciadorTarefasService,
    private dialog: MatDialog,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {}

  async onSubmit(formulario: NgForm) {
    if (formulario.invalid) {
      return;
    }
    return await this.service
      .login(formulario.value.email, formulario.value.senha)
      .then((response) => {
        if(response['id']) {
          this.router.navigate(["/home"]);
          this.store.dispatch(UsuarioActions.login({ usuario: response}))
        }
      })
      .catch((error) => {
        switch (error.status) {
          case 403:
            this.exibirModalSenhaIncorreta();
            break;
          case 404:
            this.exibirModalUsuarioInexistente();
            break;
        }
      });
  }

  exibirModalSenhaIncorreta() {
    this.dialog.open(SenhaIncorretaModalComponent);
  }

  exibirModalUsuarioInexistente() {
    const dialogRef = this.dialog.open(UsuarioInexistenteModalComponent);
    dialogRef.afterClosed().subscribe((resposta: boolean) => {
      if (resposta == true) {
        this.router.navigate(["/cadastrar-usuario"])
      }
    });
  }
}

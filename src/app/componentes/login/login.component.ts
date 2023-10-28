import { Component, OnInit } from '@angular/core';
import { GerenciadorTarefasService } from 'src/app/service/gerenciador-tarefas.service';
import { SenhaIncorretaModalComponent } from '../modais/senha-incorreta-modal/senha-incorreta-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private service: GerenciadorTarefasService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {}

  async onSubmit(formulario: any) {
    return await this.service
      .login(formulario.value.email, formulario.value.senha)
      .catch((error) => {
        if (error.status == 403) {
          this.exibirModal();
          console.log(error)
        }
      });
  }

  exibirModal() {
    this.dialog.open(SenhaIncorretaModalComponent)
  }
}

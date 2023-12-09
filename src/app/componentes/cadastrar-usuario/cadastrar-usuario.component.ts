import { Usuario } from './../../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { first, firstValueFrom } from 'rxjs';
import { GerenciadorTarefasService } from 'src/app/service/gerenciador-tarefas.service';
import { ErroModalComponent } from '../modais/erro-modal/erro-modal.component';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.scss']
})
export class CadastrarUsuarioComponent implements OnInit{

  constructor(
    private service: GerenciadorTarefasService,
    private router: Router,
    private dialog: MatDialog
  ){}

  ngOnInit(){}

  onSubmit(formulario: any) {
    let usuario: Usuario = new Usuario(
      formulario.value.nome,
      formulario.value.email,
      formulario.value.telefone,
      formulario.value.senha
    );

    console.log('cadastrar-usuario.component: ', usuario)
    this.service.cadastrarUsuario(usuario)
      .then(response => {
        console.log('response: ', response)
        console.log('Cadastro realizado com sucesso!')
      }).catch(error => {
        if (error.status == 409) {
          this.dialog.open(ErroModalComponent, {
            data: {
              titulo: 'Error ao cadastrar',
              descricao: 'O endereço de e-mail já está em uso'
            }
          });
          console.log(error.error.message)
        } else {
          this.dialog.open(ErroModalComponent, {
            data: {
              titulo: 'Error ao cadastrar',
              descricao: 'Algo deu errado, tente novamente mais tarde.'
            }
          });
          console.log('Erro: ', error);
        };
      });

  }

  telaLogin() {
    this.router.navigate(['login']);
  }
}

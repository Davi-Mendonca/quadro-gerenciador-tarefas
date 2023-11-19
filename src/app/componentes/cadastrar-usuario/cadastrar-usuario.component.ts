import { Usuario } from './../../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GerenciadorTarefasService } from 'src/app/service/gerenciador-tarefas.service';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.scss']
})
export class CadastrarUsuarioComponent implements OnInit{

  constructor(
    private service: GerenciadorTarefasService,
    private router: Router
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
    let result = this.service.cadastrarUsuario(usuario);

    console.log('response: ', result)
  }

  telaLogin() {
    this.router.navigate(['login']);
  }
}

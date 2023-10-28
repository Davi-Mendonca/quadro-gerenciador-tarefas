import { Component, OnInit } from '@angular/core';
import { GerenciadorTarefasService } from 'src/app/service/gerenciador-tarefas.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private service: GerenciadorTarefasService){}

  ngOnInit() {}

  async onSubmit(formulario: any){
    return await this.service.login(
        formulario.value.email,
        formulario.value.senha
      ).catch((error) => {
        if(error.status == 403)
        console.log("Senha incorreta. ");
      })
  }
}

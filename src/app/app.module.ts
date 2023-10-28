import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginaInicialComponent } from './componentes/pagina-inicial/pagina-inicial.component';
import { QuadroComponent } from './componentes/quadro/quadro.component';
import { ColunaComponent } from './componentes/coluna/coluna.component';
import { TarefaComponent } from './componentes/tarefa/tarefa.component';
import { CadastrarUsuarioComponent } from './componentes/cadastrar-usuario/cadastrar-usuario.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './componentes/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginaInicialComponent,
    QuadroComponent,
    ColunaComponent,
    TarefaComponent,
    CadastrarUsuarioComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

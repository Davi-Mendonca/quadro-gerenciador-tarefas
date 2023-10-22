import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginaInicialComponent } from './componentes/pagina-inicial/pagina-inicial.component';
import { QuadroComponent } from './componentes/quadro/quadro.component';
import { ColunaComponent } from './componentes/coluna/coluna.component';
import { TarefaComponent } from './componentes/tarefa/tarefa.component';
import { CadastrarUsuarioComponent } from './componentes/cadastrar-usuario/cadastrar-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginaInicialComponent,
    QuadroComponent,
    ColunaComponent,
    TarefaComponent,
    CadastrarUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

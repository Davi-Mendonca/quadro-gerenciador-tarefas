import { MatDialogModule } from '@angular/material/dialog';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SenhaIncorretaModalComponent } from './componentes/modais/senha-incorreta-modal/senha-incorreta-modal.component';
import { UsuarioInexistenteModalComponent } from './componentes/modais/usuario-inexistente-modal/usuario-inexistente-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginaInicialComponent,
    QuadroComponent,
    ColunaComponent,
    TarefaComponent,
    CadastrarUsuarioComponent,
    LoginComponent,
    SenhaIncorretaModalComponent,
    UsuarioInexistenteModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

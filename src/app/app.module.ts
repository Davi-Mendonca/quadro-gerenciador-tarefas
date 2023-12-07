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
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/app.reducer';
import { NomeNovoElementoModalComponent } from './componentes/modais/nome-novo-elemento-modal/nome-novo-elemento-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { NovaTarefaModalComponent } from './componentes/modais/nova-tarefa-modal/nova-tarefa-modal.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EditarNomeElementoModalComponent } from './componentes/modais/editar-nome-elemento-modal/editar-nome-elemento-modal.component';
import { ConfirmacaoModalComponent } from './componentes/modais/confirmacao-modal/confirmacao-modal.component';
import { ErroModalComponent } from './componentes/modais/erro-modal/erro-modal.component';


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
    UsuarioInexistenteModalComponent,
    NomeNovoElementoModalComponent,
    NovaTarefaModalComponent,
    EditarNomeElementoModalComponent,
    ConfirmacaoModalComponent,
    ErroModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatButtonModule,
    StoreModule.forRoot(reducers),
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    DragDropModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaInicialComponent } from './componentes/pagina-inicial/pagina-inicial.component';
import { CadastrarUsuarioComponent } from './componentes/cadastrar-usuario/cadastrar-usuario.component';
import { LoginComponent } from './componentes/login/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: PaginaInicialComponent},
  {path: 'cadastrar-usuario', component: CadastrarUsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

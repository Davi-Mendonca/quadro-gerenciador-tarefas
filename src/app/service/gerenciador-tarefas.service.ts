import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { Observable, catchError, firstValueFrom, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GerenciadorTarefasService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'applicatiob/json'
    })
  }

  async cadastrarUsuario(data: Usuario): Promise<any> {
    console.log('Service: ', data)

    return await firstValueFrom(this.http.post<any>("http://localhost:3000/cadastro", data))
      .then((response) => {
        return {id: response.id, nome: response.nome}
      }).catch((error) => {
        throw error;
      })
  }

  async login(email: string, senha: string) {
    const data = {
      email: email,
      senha: senha
    }
    return await firstValueFrom(this.http.post<any>("http://localhost:3000/login", data))
      .then((response) => {
        return response;
      }).catch((error) => {
        throw error;
      })
  }

  cadastrarQuadro(data: any): Observable<any> {
    return this.http.post<any>("http://localhost:3000/quadros", data);
  }

  cadastrarColuna(data: any): Observable<any> {
    return this.http.post<any>("http://localhost:3000/colunas", data);
  }

  cadastrarTarefa(data: any): Observable<any> {
    return this.http.post<any>("http://localhost:3000/tarefas", data);
  }

  movertarefa() {

  }

  atualizarTarefa(colunaEntrada: string, tarefa: string): Observable<any> {
    let data = {
      idColuna: colunaEntrada
    }
    return this.http.patch<any>("http://localhost:3000/tarefas/".concat(tarefa), data)
  }
}

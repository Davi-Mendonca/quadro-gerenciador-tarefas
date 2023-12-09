import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { Observable, catchError, firstValueFrom, of, throwError } from 'rxjs';
import { Tarefa } from '../models/Tarefa.model';

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

  cadastrarUsuario(data: Usuario): Promise<any> {
    console.log('Service: ', data)

    return firstValueFrom(this.http.post<any>("http://localhost:3000/cadastro", data));
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

  renomearQuadro(idQuadro: string, nome: string): Observable<any> {
    let data = {
      nome: nome
    }
    return this.http.put<any>("http://localhost:3000/quadros/".concat(idQuadro), data);
  }

  apagarQuadro(id: string): Observable<any> {
    return this.http.delete<any>("http://localhost:3000/quadros/".concat(id));
  }

  cadastrarColuna(data: any): Observable<any> {
    return this.http.post<any>("http://localhost:3000/colunas", data);
  }

  cadastrarTarefa(data: any): Observable<any> {
    return this.http.post<any>("http://localhost:3000/tarefas", data);
  }

  atualizarTarefa(idTarefa: string, data: Tarefa): Observable<any> {
    console.log('service: ', data)
    return this.http.put<any>('http://localhost:3000/tarefas/'.concat(idTarefa), data);
  }

  deletarTarefa(idTarefa: string): Observable<any> {
    return this.http.delete<any>('http://localhost:3000/tarefas/'.concat(idTarefa));
  }

  atualizarColuna(idColuna: string, nome: string): Observable<any> {
    let data = {
      "nome":  nome
    }
    return this.http.put<any>('http://localhost:3000/colunas/'.concat(idColuna), data);
  }

  deletarColuna(idColuna: string): Observable<any> {
    return this.http.delete<any>('http://localhost:3000/colunas/'.concat(idColuna));
  }

  moverTarefa(colunaEntrada: string, tarefa: string): Observable<any> {
    let data = {
      idColuna: colunaEntrada
    }
    console.log('mover tarefa service data: ', data);
    console.log('mover tarefa service id: ', tarefa)
    return this.http.put<any>("http://localhost:3000/tarefas/".concat(tarefa), data)
  }
}

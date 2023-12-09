import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store/state/app.state';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(): Observable<boolean> {
    console.log('chamou o guard')
    return this.store.pipe(
      select(state => state.usuarioLogado),
      take(1),
      map(usuarioLogado => !!usuarioLogado && !!usuarioLogado.id),
      tap(usuarioLogado => {
        console.log('chamou o tap')
        if (!usuarioLogado) {
          console.log('está vazio')
          this.router.navigate(['/login']);
        }
      })
    );
  }
}

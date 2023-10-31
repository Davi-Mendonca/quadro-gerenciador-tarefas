import { ActionReducerMap } from '@ngrx/store';
import { UsuarioLogado } from '../models/UsuarioLogado.model';
import { usuarioReducer } from '../store/reducer/usuarioLogado.reducer';

export interface AppState {
  usuarioLogado: UsuarioLogado;
}

export const reducers: ActionReducerMap<AppState> = {
  usuarioLogado: usuarioReducer
};

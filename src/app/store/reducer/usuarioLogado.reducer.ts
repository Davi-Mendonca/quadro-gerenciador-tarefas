import { createReducer, on } from '@ngrx/store';
import { UsuarioLogado } from '../../models/UsuarioLogado.model';
import * as UsuarioActions from '../action/usuarioLogado.actions';

export const initialState: UsuarioLogado = {};

const usuarioLogadoReducer = createReducer(
  initialState,
  on(UsuarioActions.login, (state, { usuario }) => usuario),
  on(UsuarioActions.logout, () => initialState)
);

export function usuarioReducer(state: any, action: any) {
  return usuarioLogadoReducer(state, action);
}

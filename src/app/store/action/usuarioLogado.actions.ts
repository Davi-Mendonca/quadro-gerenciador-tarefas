import { createAction, props } from '@ngrx/store';
import { UsuarioLogado } from '../../models/UsuarioLogado.model';

export const login = createAction(
  '[UsuarioLogado] Login',
  props<{ usuario: UsuarioLogado }>()
);

export const logout = createAction('[UsuarioLogado] Logout');

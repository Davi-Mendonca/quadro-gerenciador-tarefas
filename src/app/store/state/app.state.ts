import { UsuarioLogado } from './../../models/UsuarioLogado.model';

export interface AppState {
  usuarioLogado: UsuarioLogado | null;
}

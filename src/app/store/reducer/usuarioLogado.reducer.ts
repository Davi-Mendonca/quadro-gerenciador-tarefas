import { createReducer, on } from '@ngrx/store';
import { UsuarioLogado } from '../../models/UsuarioLogado.model';
import * as UsuarioActions from '../action/usuarioLogado.actions';

export const initialState: UsuarioLogado = {};

const usuarioLogadoReducer = createReducer(
  initialState,
  on(UsuarioActions.login, (state, { usuario }) => usuario),

  on(UsuarioActions.logout, () => initialState),

  on(UsuarioActions.novoQuadro, (state, { quadro }) => ({
    ...state,
    quadros: state.quadros ? [...state.quadros, quadro] : [quadro]
  })),

  on(UsuarioActions.novaColuna, (state, { idQuadro, coluna }) => {
    const quadrosAtualizados = state.quadros?.map( quadro => {
      if (idQuadro === quadro.id) {
        return {...quadro, colunas: [...quadro.colunas || [], coluna]};
      }
      return quadro;
    })
    return {...state, quadros: quadrosAtualizados}
  }),

  on(UsuarioActions.quadroAtivo, (state, {quadroAtivo}) => {
    return {...state, quadroAtivo: quadroAtivo}
  }),

  on(UsuarioActions.novaTarefa, (state, {idQuadro, idColuna, tarefa}) => {
    const quadrosAtualizados = state.quadros?.map(quadro => {
      if (idQuadro === quadro.id) {
        const colunasAtualizadas = quadro.colunas?.map(coluna => {
          if (idColuna === coluna.id) {
            return {...coluna, tarefas: [...coluna.tarefas || [], tarefa]}
          }
          return coluna;
        });
        return {...quadro, colunas: colunasAtualizadas}
      }
      return quadro;
    });
    return {...state, quadros: quadrosAtualizados};
  })
);

export function usuarioReducer(state: any, action: any) {
  return usuarioLogadoReducer(state, action);
}

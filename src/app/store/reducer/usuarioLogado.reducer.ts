// import { moverTarefa } from './../action/usuarioLogado.actions';
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
  }),

  on(UsuarioActions.renomearColuna, (state, {quadroAtivo, idColuna, nomeColuna}) => {
    const quadrosAtualizados = state.quadros?.map(quadro => {
      if(quadro.id === quadroAtivo) {
        const colunasAtualizadas = quadro.colunas?.map(coluna => {
          if (coluna.id === idColuna) {
            return {...coluna, nome: nomeColuna};
          }
          return coluna;
        });
        return {...quadro, colunas: colunasAtualizadas};
      }
      return quadro;
    });
    return {...state, quadros: quadrosAtualizados};
  }),

  on(UsuarioActions.excluirColuna, (state, {quadroAtivo, idColuna}) => {
    const quadrosAtualizados = state.quadros?.map(quadro => {
      if(quadro.id === quadroAtivo) {
        const colunasAtualizadas = quadro.colunas?.filter(coluna => coluna.id !== idColuna);
        return {...quadro, colunas: colunasAtualizadas};
      }
      return quadro;
    });
    return {...state, quadros: quadrosAtualizados};
  }),

  on(UsuarioActions.renomearQuadro, (state, {quadroAtivo, nome}) => {
    const quadrosAtualizados = state.quadros?.map(quadro => {
      if (quadro.id === quadroAtivo) {
        return {...quadro, nome: nome};
      }
      return quadro;
    });
    return {...state, quadros: quadrosAtualizados};
  }),

  on(UsuarioActions.excluirQuadro, (state, {quadroAtivo}) => {
    const quadrosAtualizados = state.quadros?.filter(quadro => quadro.id !== quadroAtivo);
    return {...state, quadros: quadrosAtualizados};
  }),

  on(UsuarioActions.moverTarefa, (state, {quadroAtivo, colunaSaida, colunaEntrada, tarefaMov}) => {
    let tarefaMovida: any;
    state.quadros?.map(quadro => {
      if (quadro.id === quadroAtivo) {
        quadro.colunas?.map(coluna => {
          if (coluna.id === colunaSaida) {
            tarefaMovida = coluna.tarefas?.find(tarefa => tarefa.id === tarefaMov)
          }
        })
      }
    })
    const quadrosAtualizados = (state.quadros || []).map(quadro => {
      if (quadro.id === quadroAtivo) {
        const colunasAtualizadas = (quadro.colunas || []).map(coluna => {
          if (coluna.id === colunaSaida) {
            const tarefasAtualizadas = (coluna.tarefas || []).filter(t => t.id !== tarefaMov);
            return { ...coluna, tarefas: tarefasAtualizadas };
          } else if (coluna.id === colunaEntrada) {
            const tarefasAtualizadas = [...(coluna.tarefas || []), { ...tarefaMovida, idColuna: colunaEntrada }];
            return { ...coluna, tarefas: tarefasAtualizadas };
          }
          return coluna;
        });
        return { ...quadro, colunas: colunasAtualizadas };
      }
      return quadro;
    });
    return { ...state, quadros: quadrosAtualizados };
  }),

  on(UsuarioActions.atualizarTarefa, (state, {quadroAtivo, idColuna, data}) => {
    console.log('reducer: ', data)
    const {titulo, descricao, dataParaConclusao, nivelPrioridade} = data;
    const quadrosAtualizados = state.quadros?.map(quadro => {
      if (quadro.id === quadroAtivo) {
        const colunasAtualizadas = quadro.colunas?.map(coluna => {
          if (coluna.id === idColuna) {
            console.log('reducer idColuna: ', idColuna)
            const tarefasAtualizadas = coluna.tarefas?.map(tarefa => {
              if (tarefa.id === data.id) {
                console.log('reducer descricao: ', descricao)
                return {...tarefa,
                  titulo: titulo,
                  descricao: descricao,
                  dataParaConclusao: dataParaConclusao,
                  nivelPrioridade: nivelPrioridade
                }
              }
              return tarefa;
            });
            console.log('reducer tarefasAtualizadas: ', tarefasAtualizadas)
            return {...coluna, tarefas: tarefasAtualizadas}
          }
          return coluna;
        });
        return {...quadro, colunas: colunasAtualizadas}
      }
      return quadro;
    });
    return {...state, quadros: quadrosAtualizados}
  }),

  on(UsuarioActions.excluirTarefa, (state, {quadroAtivo, idColuna, idTarefa}) => {
    const quadrosAtualizados = state.quadros?.map(quadro => {
      if (quadro.id === quadroAtivo) {
        const colunasAtualizadas = quadro.colunas?.map(coluna => {
          if (coluna.id === idColuna) {
            const tarefasAtualizadas = coluna.tarefas?.filter(tarefa => tarefa.id !== idTarefa)
            return {...coluna, tarefas: tarefasAtualizadas};
          }
          return coluna;
        });
        return {...quadro, colunas: colunasAtualizadas};
      }
      return quadro
    });
    return {...state, quadros: quadrosAtualizados};
  })
);

export function usuarioReducer(state: any, action: any) {
  return usuarioLogadoReducer(state, action);
}

import { createAction, props } from '@ngrx/store';
import { UsuarioLogado } from '../../models/UsuarioLogado.model';
import { Quadro } from 'src/app/models/Quadro.model';
import { Coluna } from 'src/app/models/Coluna.model';
import { Tarefa } from 'src/app/models/Tarefa.model';

export const login = createAction(
  '[UsuarioLogado] Login',
  props<{ usuario: UsuarioLogado }>()
);

export const logout = createAction('[UsuarioLogado] Logout');
export const novoQuadro = createAction('[UsuarioLogado] NovoQuadro', props<{ quadro: Quadro }>());
export const novaColuna = createAction('[UsuarioLogado] NovaColuna', props<{ idQuadro: string; coluna: Coluna }>());
export const quadroAtivo = createAction('[UsuarioLogado] QuadroAtivo', props<{ quadroAtivo: string }>());
export const novaTarefa = createAction('[UsuarioLogado] NovaTarefa', props<{idQuadro: string; idColuna: string; tarefa: Tarefa}>());
export const moverTarefa = createAction('[UsuarioLogado] MoverTarefa', props<{ quadroAtivo: string, colunaSaida: string, colunaEntrada: string, tarefaMov: string}>())
export const renomearColuna = createAction('[UsuarioLogado] RenomearColuna', props<{quadroAtivo: string, idColuna: string, nomeColuna: string}>());
export const excluirColuna = createAction('[UsuarioLogado] ExcluirColuna', props<{quadroAtivo: string, idColuna: string}>());
export const renomearQuadro = createAction('[UsuarioLogado] RenomearQuadro', props<{quadroAtivo: string, nome: string}>());
export const excluirQuadro = createAction('[UsuarioLogado] ExcluirQuadro', props<{quadroAtivo: string}>());
export const atualizarTarefa = createAction('[UsuarioLogado] AtualizarTarefa', props<{quadroAtivo: string, idColuna: string, data: Tarefa}>());
export const excluirTarefa = createAction('[UsuarioLogado] ExcluirTarefa', props<{quadroAtivo: string, idColuna: string, idTarefa: string}>());

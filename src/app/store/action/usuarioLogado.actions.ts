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
export const novoQuadro = createAction('[UsuarioLogado] NovoQuadro', props<{ quadro: Quadro }>())
export const novaColuna = createAction('[UsuarioLogado] NovaColuna', props<{ idQuadro: string; coluna: Coluna }>())
export const quadroAtivo = createAction('[UsuarioLogado] QuadroAtivo', props<{ quadroAtivo: string }>())
export const novaTarefa = createAction('[UsuarioLogado] NovaTarefa', props<{idQuadro: string; idColuna: string; tarefa: Tarefa}>())
export const atualizarTarefa = createAction('[UsuarioLogado] AtualizarTarefa', props<{ quadroAtivo: string, colunaSaida: string, colunaEntrada: string, tarefa: string}>())

import { GameState } from '../models/GameState';
import { Player } from '../models/Player';

export interface GameContextState {
  gameState: GameState;
  players: Player[];
  currentPlayerId?: number;
}

export enum GameActionsTypes {
  CHANGE_GAME_STATE = 'CHANGE_GAME_STATE',
  ADD_PLAYER = 'ADD_PLAYER',
  UPDATE_PLAYERS = 'UPDATE_PLAYERS',
  UPDATE_TURN = 'UPDATE_TURN',
}
export type GameAction =
  | { type: GameActionsTypes.CHANGE_GAME_STATE; payload: GameState }
  | { type: GameActionsTypes.ADD_PLAYER; player: Player }
  | { type: GameActionsTypes.UPDATE_PLAYERS; payload: Player[]}
  | { type: GameActionsTypes.UPDATE_TURN};


export const gameReducer = (
  state: GameContextState,
  action: GameAction
): GameContextState => {
  switch (action.type) {
    case GameActionsTypes.CHANGE_GAME_STATE:
      return { ...state, gameState: action.payload };
    case GameActionsTypes.ADD_PLAYER:
      return { ...state, players: [...state.players, action.player] };
    case GameActionsTypes.UPDATE_PLAYERS:
      return { ...state, players: action.payload };
    case GameActionsTypes.UPDATE_TURN:
      return { ...state, currentPlayerId: getNextPlayerId(state.players, state.currentPlayerId) };
    default:
      return state;
  }
};

function getNextPlayerId(players: Player[], currentPlayerId?: number): number {
  if (!currentPlayerId) return players[0].id;
  const currentPlayerIndex = players.findIndex((player) => player.id === currentPlayerId);
  const nextPlayerIndex = currentPlayerIndex + 1;
  return players[nextPlayerIndex] ? players[nextPlayerIndex].id : players[0].id;
}

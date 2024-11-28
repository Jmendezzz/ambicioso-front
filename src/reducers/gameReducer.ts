import { GameState } from '../models/GameState';
import { Player } from '../models/Player';

export interface GameContextState {
  gameState: GameState;
  players: Player[];
  currentPlayerId?: number;
}

export enum GameActionsTypes {
  START = 'START',
  ADDING_PLAYERS = 'ADDING_PLAYERS',
  END = 'END',
  ADD_PLAYER = 'ADD_PLAYER',
  UPDATE_PLAYERS = 'UPDATE_PLAYERS',
  UPDATE_TURN = 'UPDATE_TURN',
}
export type GameAction =
  | { type: GameActionsTypes.START }
  | { type: GameActionsTypes.ADDING_PLAYERS }
  | { type: GameActionsTypes.END }
  | { type: GameActionsTypes.ADD_PLAYER; player: Player }
  | { type: GameActionsTypes.UPDATE_PLAYERS; payload: Player[]}
  | { type: GameActionsTypes.UPDATE_TURN; payload: number};


export const gameReducer = (
  state: GameContextState,
  action: GameAction
): GameContextState => {
  switch (action.type) {
    case GameActionsTypes.START:
      return { ...state, gameState: GameState.STARTED };
    case GameActionsTypes.ADDING_PLAYERS:
        return { ...state, gameState: GameState.ADDING_PLAYERS };
    case GameActionsTypes.END:
      return { ...state, gameState: GameState.ENDED };
    case GameActionsTypes.ADD_PLAYER:
      return { ...state, players: [...state.players, action.player] };
    case GameActionsTypes.UPDATE_PLAYERS:
      return { ...state, players: action.payload };
    case GameActionsTypes.UPDATE_TURN:
      return { ...state, currentPlayerId: action.payload };
    default:
      return state;
  }
};

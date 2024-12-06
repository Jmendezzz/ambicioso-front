import { GameState } from '../models/GameState';
import { Player } from '../models/Player';
import { MAXIMUM_SCORE } from '../utils/constants/GameConstants';

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
  DECREASE_CURRENT_PLAYER_SCORE = 'DECREASE_CURRENT_PLAYER_SCORE',
  INCREASE_CURRENT_PLAYER_SCORE = 'INCREASE_CURRENT_PLAYER_SCORE',
}
export type GameAction =
  | { type: GameActionsTypes.CHANGE_GAME_STATE; payload: GameState }
  | { type: GameActionsTypes.ADD_PLAYER; player: Player }
  | { type: GameActionsTypes.UPDATE_PLAYERS; payload: Player[] }
  | { type: GameActionsTypes.UPDATE_TURN }
  | { type: GameActionsTypes.DECREASE_CURRENT_PLAYER_SCORE; payload: number }
  | { type: GameActionsTypes.INCREASE_CURRENT_PLAYER_SCORE; payload: number };

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
      return {
        ...state,
        currentPlayerId: getNextPlayerId(state.players, state.currentPlayerId),
      };
    case GameActionsTypes.DECREASE_CURRENT_PLAYER_SCORE:
      return {
        ...state,
        players: decreasePlayerScore(
          state.players,
          state.currentPlayerId,
          action.payload
        ),
      };
    case GameActionsTypes.INCREASE_CURRENT_PLAYER_SCORE:
      return {
        ...state,
        ...increasePlayerScore(
          state.players,
          state.currentPlayerId,
          action.payload
        ),
      };
    default:
      return state;
  }
};

function getNextPlayerId(players: Player[], currentPlayerId?: number): number {
  if (!currentPlayerId) return players[0].id;
  const currentPlayerIndex = players.findIndex(
    (player) => player.id === currentPlayerId
  );
  const nextPlayerIndex = currentPlayerIndex + 1;
  return players[nextPlayerIndex] ? players[nextPlayerIndex].id : players[0].id;
}

function increasePlayerScore(
  players: Player[],
  currentPlayerId: number | undefined,
  score: number
): Partial<GameContextState> {
  if (!currentPlayerId) return { players };

  const playerScoreUpdated = {
    players: players.map((player) => {
      if (player.id === currentPlayerId) {
        if (player.score + score >= MAXIMUM_SCORE)
          return { ...player, score: MAXIMUM_SCORE };
        return { ...player, score: player.score + score };
      }
      return player;
    }),
  };

  if (
    playerScoreUpdated.players.find((player) => player.score >= MAXIMUM_SCORE)
  ) {
    return { ...playerScoreUpdated, gameState: GameState.ENDED };
  }
  return playerScoreUpdated;
}

function decreasePlayerScore(
  players: Player[],
  currentPlayerId: number | undefined,
  score: number
): Player[] {
  if (!currentPlayerId) return players;

  return players.map((player) => {
    if (player.id === currentPlayerId) {
      if (player.score - score < 0) return { ...player, score: 0 };
      return { ...player, score: player.score - score };
    }
    return player;
  });
}

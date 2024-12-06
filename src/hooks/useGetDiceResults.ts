import { useState } from 'react';
import { getDiceNumber } from '../services/ambiciosoService';
import { useGameContext } from '../contexts/GameContext';
import { GameActionsTypes } from '../reducers/gameReducer';
import { GameState } from '../models/GameState';

export function useGetDiceResults() {
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const { state, dispatch } = useGameContext();

  const onDiceResult = (diceResult: number | null) => {
    if (diceResult == null) return;
    const player = state.players.find(
      (player) => player.id === state.currentPlayerId
    );
    if (!player) return;

    if (diceResult === 1) {
      dispatch({type:GameActionsTypes.CHANGE_GAME_STATE, payload: GameState.QUESTION});
      return;
    }
    dispatch({
      type: GameActionsTypes.UPDATE_PLAYERS,
      payload: state.players.map((p) => {
        if (p.id === player.id) {
          return { ...p, score: p.score + diceResult };
        }
        return p;
      }),
    });
  };

  const getDiceNumberResult = async () => {
    setLoading(true);
    getDiceNumber()
      .then((response) => {
        console.log('Dice number response', response);
        setResult(response);
        setLoading(false);
        onDiceResult(response);
      })
      .catch((error) => {
        console.error('Error getting dice number', error);
        setLoading(false);
      });
  };

  return { result, loading, getDiceNumberResult };
}

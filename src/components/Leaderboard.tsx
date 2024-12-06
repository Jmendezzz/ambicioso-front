import { useEffect } from 'react';
import GeneralScore from './GeneralScore';
import { useGameContext } from '../contexts/GameContext';
import { GameActionsTypes } from '../reducers/gameReducer';
import { GameState } from '../models/GameState';
import Button from './Button';

function Leaderboard() {
  const { dispatch } = useGameContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: GameActionsTypes.CHANGE_GAME_STATE, payload: GameState.PLAYER_TURN });
    }, 5000);

    return () => clearTimeout(timer); 
  }, []);

  return (
    <div className="flex flex-col items-center gap-10">
        <GeneralScore />
        <Button onClick={() => dispatch({ type: GameActionsTypes.CHANGE_GAME_STATE, payload: GameState.PLAYER_TURN })}>Continuar</Button>
    </div>
  );
}

export default Leaderboard;
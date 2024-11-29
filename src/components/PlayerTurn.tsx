import { useEffect } from 'react';
import { useGameContext } from '../contexts/GameContext';
import { GameActionsTypes } from '../reducers/gameReducer';
import DiceLoading from './DiceLoading';

function PlayerTurn() {
  const { state, dispatch } = useGameContext();

  const currentPlayer = state.players.find(
    (player) => player.id === state.currentPlayerId
  );

  useEffect(() => {
    if (!currentPlayer) {
      return;
    }
    const text = `Turno del jugador ${currentPlayer?.name}`;
    document.title = text;
    const voice = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(voice);
  }, [currentPlayer]);
  return (
    <div className='flex flex-col gap-8 items-center'>
      <h2 className='text-4xl'>Turno del jugador {currentPlayer?.name}</h2>
      <DiceLoading />
    </div>
  );
}

export default PlayerTurn;

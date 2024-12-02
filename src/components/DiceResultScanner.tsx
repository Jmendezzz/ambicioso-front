import { useEffect, useState } from 'react';
import DiceLoading from './DiceLoading';
import { useGetDiceResults } from '../hooks/useGetDiceResults';
import { useGameContext } from '../contexts/GameContext';

function DiceResultScanner() {
  const {state, dispatch} = useGameContext();
  const [countdown, setCountdown] = useState(5);
  const { result, loading, getDiceNumberResult } = useGetDiceResults();

  const player = state.players.find(player => player.id === state.currentPlayerId);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      getDiceNumberResult();
    }
  }, [countdown]);
  
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space' && result === null && !loading) { 
        getDiceNumberResult();
      }
    };
  
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [result, loading]);

  return (
    <div className="absolute w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl text-white bg-black/50 flex flex-col justify-center items-center">
      {countdown > 0 && <span>{countdown}</span>}
      {loading && <DiceLoading />}
      {!loading && <span className='text-center text-3xl'>El jugador <span className='text-primary font-extrabold'>{player?.name}</span> ha obtenido un puntaje de: <span className='text-primary font-extrabold'>{result}</span></span>}
      {result === null && !loading && (
        <span className="text-lg">
          No se detectaron resultados presiona <span className="text-primary font-bold">Espacio</span> para intentar de nuevo
        </span>
      )}
    </div>
  );
}

export default DiceResultScanner;

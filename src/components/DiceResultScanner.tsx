import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DiceLoading from './DiceLoading';
import { useGetDiceResults } from '../hooks/useGetDiceResults';
import { useGameContext } from '../contexts/GameContext';
import VideoStream from './VideoStream';
import { AMBICIOSO_PHRASE, PLANTARSE_PHRASE } from '../utils/constants/GameConstants';
import DiceResultButtonHandlers from './DiceResultButtonHandlers';
[];
function DiceResultScanner() {
  const { state, dispatch } = useGameContext();
  const [countdown, setCountdown] = useState(5);
  const { result, loading, getDiceNumberResult } = useGetDiceResults();

  const player = state.players.find(
    (player) => player.id === state.currentPlayerId
  );

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => getDiceNumberResult(), 2000);
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
    <>
      <motion.div
        initial={{ scale: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        animate={
          result === null
            ? {
                y: -200,
                scaleX: 1.4,
                scaleY: 1.5,
                backgroundColor: 'rgba(0, 0, 0, 1)',
              }
            : { scale: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }
        }
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="w-[1000px] h-[500px]">
          <VideoStream />
        </div>
        <div className="absolute w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl text-white bg-black/50 border-8 border-black flex flex-col justify-center items-center">
          {countdown > 0 && <span>{countdown}</span>}
          {loading && <DiceLoading />}
          {!loading && result !== null && (
            <span className="text-center text-3xl">
              El jugador{' '}
              <span className="text-primary font-extrabold">
                {player?.name}
              </span>{' '}
              ha obtenido un puntaje de:{' '}
              <span className="text-primary font-extrabold">{result}</span>
            </span>
          )}
          {result === null && !loading && (
            <span className="text-lg">
              No se detectaron resultados presiona{' '}
              <span className="text-primary font-bold">Espacio</span> para
              intentar de nuevo
            </span>
          )}
          {result && !loading && (
            <div>
              <DiceResultButtonHandlers
                phrase={PLANTARSE_PHRASE}
                position="left"
              />
              <DiceResultButtonHandlers
                phrase={AMBICIOSO_PHRASE}
                position="right"
              />
            </div>
          )}
        </div>
      </motion.div>
      {!result && (
        <div className="absolute bottom-0 right-0 bg-black/80 h-full w-full -z-10"></div>
      )}
    </>
  );
}

export default DiceResultScanner;

import { motion } from 'framer-motion';
import { useGetDiceResults } from '../hooks/useGetDiceResults';
import { useGameContext } from '../contexts/GameContext';
import VideoStream from './VideoStream';
import {
  AMBICIOSO_PHRASE,
  PLANTARSE_PHRASE,
  REGRESSIVE_COUNTDOWN,
} from '../utils/constants/GameConstants';
import DiceResultButtonHandlers from './DiceResultButtonHandlers';
import { useCountdown } from '../hooks/useCountdown';
import { useKeyPress } from '../hooks/useKeyPress';
import ResultDisplay from './DiceResultDisplay';
import { GameActionsTypes } from '../reducers/gameReducer';
import { GameState } from '../models/GameState';

function DiceResultScanner() {
  const { state, dispatch } = useGameContext();
  const { result, loading, getDiceNumberResult } = useGetDiceResults();

  const player = state.players.find(
    (player) => player.id === state.currentPlayerId
  );
  useKeyPress(() => {
    if (result === null && !loading) {
      setTimeout(() => {
        getDiceNumberResult();
      }, 1000);
    }
  }, 'Space');

  const countdown = useCountdown(REGRESSIVE_COUNTDOWN, getDiceNumberResult);

  const handleLeftClick = () => {
    dispatch({ type: GameActionsTypes.UPDATE_TURN });
    dispatch({
      type: GameActionsTypes.CHANGE_GAME_STATE,
      payload: GameState.LEADERBOARD,
    });
  };

  const handleRightClick = () => {
    dispatch({
      type: GameActionsTypes.CHANGE_GAME_STATE,
      payload: GameState.LEADERBOARD,
    });
  };

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
        className="relative w-full h-full"
      >
        <div className="relative w-[1000px] h-[600px]">
          <VideoStream />
          {result === null && (
            <div className="z-10 absolute top-0 left-0 w-full h-full flex py-10 justify-center">
              <div className="text-4xl text-white">
                Turno del jugador{' '}
                <span className="text-primary">{player?.name}</span>{' '}
              </div>
            </div>
          )}
        </div>
        <ResultDisplay
          countdown={countdown}
          loading={loading}
          result={result}
          playerName={player?.name}
        />
        {result !== null && (
          <>
            <DiceResultButtonHandlers
              phrase={PLANTARSE_PHRASE}
              position="left"
              onClick={handleLeftClick}
            />
            <DiceResultButtonHandlers
              phrase={AMBICIOSO_PHRASE}
              position="right"
              onClick={handleRightClick}
            />
          </>
        )}
      </motion.div>
      {!result && (
        <div className="absolute bottom-0 right-0 bg-black/80 h-full w-full -z-10"></div>
      )}
    </>
  );
}

export default DiceResultScanner;

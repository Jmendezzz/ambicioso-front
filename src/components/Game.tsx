import { useState, useEffect } from 'react';
import { useGameContext } from '../contexts/GameContext';
import { GameState } from '../models/GameState';
import AddPlayers from './AddPlayers';
import Header from './Header';
import InitGame from './InitGame';
import LoadingScreen from './LoadingScreen';
import { AnimatePresence, motion } from 'framer-motion';
import PlayerTurn from './PlayerTurn';
import Leaderboard from './Leaderboard';
import Question from './Question';
import Ended from './Ended';

function Game() {
  const { state } = useGameContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000); 
    return () => clearTimeout(timer);
  }, [state.gameState]);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div key="loading">
            <LoadingScreen />
          </motion.div>
        )}
      </AnimatePresence>
      {!loading && (
        <>
          <Header />
          {state.gameState === GameState.NOT_STARTED && <InitGame />}
          {state.gameState === GameState.ADDING_PLAYERS && <AddPlayers />}
          {state.gameState === GameState.PLAYER_TURN && <PlayerTurn />}
          {state.gameState === GameState.LEADERBOARD && <Leaderboard />}
          {state.gameState === GameState.QUESTION && <Question/>}
          {state.gameState === GameState.ENDED && <Ended />}
        </>
      )}
    </>
  );
}

export default Game;
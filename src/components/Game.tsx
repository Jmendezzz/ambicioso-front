import { useState, useEffect } from 'react';
import { useGameContext } from '../contexts/GameContext';
import { GameState } from '../models/GameState';
import AddPlayers from './AddPlayers';
import Header from './Header';
import InitGame from './InitGame';
import LoadingScreen from './LoadingScreen';
import { AnimatePresence, motion } from 'framer-motion';
import PlayerTurn from './PlayerTurn';

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
          {state.gameState === GameState.STARTED && <PlayerTurn />}
        </>
      )}
    </>
  );
}

export default Game;
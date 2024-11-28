import { motion } from 'framer-motion';
import Button from './Button';
import { useGameContext } from '../contexts/GameContext';
import { GameActionsTypes } from '../reducers/gameReducer';

function InitGame() {
  const {dispatch} = useGameContext();
  const handleClick = () => {
    dispatch({type: GameActionsTypes.ADDING_PLAYERS});
  }
  return (
    <div className="flex-1 p-4 w-full h-full flex flex-col  items-center justify-center">
      <motion.div
        animate={{
          transform: [
            'translateY(10px)',
            'translateY(-10px)',
            'translateY(10px)',
          ],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: 'loop',
        }}
      >
        <Button onClick={() => handleClick()}>EMPEZAR PARTIDA!</Button>
      </motion.div>

    </div>
  );
}

export default InitGame;

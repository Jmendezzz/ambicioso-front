import { useGameContext } from '../contexts/GameContext';
import { useGetQuestion } from '../hooks/useGetQuestion';
import DiceLoading from './DiceLoading';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import TrueFalseQuestion from './TrueFalseQuestion';
import { motion } from 'framer-motion';

function Question() {
  const { state } = useGameContext();
  const question = useGetQuestion();
  const currentPlayer = state.players.find((player) => player.id === state.currentPlayerId)?.name

  return (
    <div className="container h-full space-y-10">
      <h2 className="text-4xl text-center  font-extrabold font-stretch-ultra-expanded">
        Pregunta para <span className='text-primary'>{currentPlayer}</span>!
      </h2>
      <div className="w-full flex justify-center">
        {question === undefined && <DiceLoading />}
        {question && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full flex justify-center"
          >
            {question.options === undefined ? (
              <TrueFalseQuestion question={question} />
            ) : (
              <MultipleChoiceQuestion question={question} />
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Question;

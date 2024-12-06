import { useState } from 'react';
import { Question } from '../models/Question';
import { motion } from 'framer-motion';
import { useGameContext } from '../contexts/GameContext';
import { GameActionsTypes } from '../reducers/gameReducer';
import { GameState } from '../models/GameState';
import {
  SCORE_DECREMENT_MULTIPLE_CHOICE_QUESTION,
} from '../utils/constants/GameConstants';

function MultipleChoiceQuestion({ question }: { question: Question }) {
  const { dispatch } = useGameContext();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (option !== question.correct_option) {
        dispatch({
          type: GameActionsTypes.DECREASE_CURRENT_PLAYER_SCORE,
          payload: SCORE_DECREMENT_MULTIPLE_CHOICE_QUESTION,
        });
        setShowCorrectAnswer(true);
      }
    }, 1000);

    setTimeout(() => {
      dispatch({ type: GameActionsTypes.UPDATE_TURN });
      dispatch({
        type: GameActionsTypes.CHANGE_GAME_STATE,
        payload: GameState.LEADERBOARD,
      });
    }, 4000);
  };

  return (
    <div className="space-y-6">
      <header className="text-center text-2xl bg-black/70 p-6 rounded-lg font-extralight">
        <h3>{question.question}</h3>
      </header>
      <div className="space-y-4">
        {question.options &&
          Object.entries(question.options).map(([key, value]) => (
            <motion.button
              key={key}
              type="button"
              className={`relative w-full py-4 text-xl px-4 border rounded-lg text-left transition-all duration-300 cursor-pointer group ${
                selectedOption === key
                  ? loading
                    ? 'bg-yellow-500 text-white'
                    : selectedOption === question.correct_option
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : 'bg-black/60 hover:bg-black/90'
              } ${
                showCorrectAnswer && key == question.correct_option
                  ? 'bg-green-500 text-white'
                  : ''
              }`}
              onClick={() => handleOptionClick(key)}
              disabled={selectedOption !== null}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {loading && selectedOption === key ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="loader border-t-2 border-b-2 border-white mx-auto h-4 w-4 rounded-full"
                />
              ) : (
                value
              )}
              {/* Flame effect */}
              {!selectedOption && (
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flames">
                    <div className="flame flame-1"></div>
                    <div className="flame flame-2"></div>
                    <div className="flame flame-3"></div>
                  </div>
                </div>
              )}
            </motion.button>
          ))}
      </div>
      {selectedOption && !loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-4"
        >
          {selectedOption === question.correct_option ? (
            <div className="text-2xl font-bold text-green-500">Correcto</div>
          ) : (
            <div className="text-2xl font-bold text-red-500">Incorrecto</div>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default MultipleChoiceQuestion;

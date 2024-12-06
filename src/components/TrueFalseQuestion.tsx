import { useState } from "react";
import { Question } from "../models/Question";
import ProgressBar from "./ProgressBar"; // Import the ProgressBar component
import { GameActionsTypes } from "../reducers/gameReducer";
import { GameState } from "../models/GameState";
import { useGameContext } from "../contexts/GameContext";
import { SCORE_DECREMENT_TRUE_FALSE_QUESTION } from "../utils/constants/GameConstants";

function TrueFalseQuestion({ question }: { question: Question }) {
  const { dispatch } = useGameContext();
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleButtonClick = (value: string) => {
    setSelectedValue(value);
    if (question.correct_answer === value) {
      setFeedback("Correcto");
    } else {
      setFeedback("Incorrecto");
      dispatch({ type: GameActionsTypes.DECREASE_CURRENT_PLAYER_SCORE, payload: SCORE_DECREMENT_TRUE_FALSE_QUESTION });
    }

    setTimeout(() => {
      dispatch({type:GameActionsTypes.UPDATE_TURN});
      dispatch({ type: GameActionsTypes.CHANGE_GAME_STATE, payload: GameState.LEADERBOARD });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <header className="text-center text-2xl bg-black/70 p-6 rounded-lg font-extralight">
        <h3>{question.question}</h3>
      </header>
      <form className="flex justify-center gap-10 text-2xl font-bold">
        <button
          type="button"
          value="Falso"
          onClick={() => handleButtonClick("Falso")}
          className={`cursor-pointer bg-red-400 rounded-sm w-[200px] h-[300px] transform transition-transform duration-300 hover:scale-110 hover:bg-red-500 ${
            selectedValue && selectedValue !== "Falso" ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={selectedValue !== null}
        >
          Falso
        </button>
        <button
          type="button"
          value="Verdadero"
          onClick={() => handleButtonClick("Verdadero")}
          className={`cursor-pointer bg-blue-400 rounded-sm w-[200px] h-[300px] transform transition-transform duration-300 hover:scale-110 hover:bg-blue-500 ${
            selectedValue && selectedValue !== "Verdadero" ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={selectedValue !== null}
        >
          Verdadero
        </button>
      </form>
      {feedback && (
        <div className="text-center mt-4 flex flex-col justify-center items-center">
          <div className={`text-2xl font-bold ${feedback === "Correcto" ? "text-green-500" : "text-red-500"}`}>
            {feedback}
          </div>
          <ProgressBar progress={selectedValue ? 100 : 0} total={100} />
        </div>
      )}
    </div>
  );
}

export default TrueFalseQuestion;
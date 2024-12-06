import { useState } from "react";
import { Question } from "../models/Question";

function MultipleChoiceQuestion({ question }: { question: Question }) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedOption !== null) {
      console.log("Selected option:", selectedOption);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <header className="mb-4">
        <h3 className="text-xl font-bold">{question.question}</h3>
      </header>
      <form onSubmit={handleSubmit} className="space-y-4">
        {question.options && Object.entries(question.options).map(([key, value]) => (
          <button
            key={key}
            type="button"
            className={`w-full py-2 px-4 border rounded-lg text-left ${selectedOption === key ? 'bg-primary text-white' : 'bg-gray-500'}`}
            onClick={() => handleOptionClick(key)}
          >
            {value}
          </button>
        ))}
        <button type="submit" disabled={selectedOption==null} className="mt-4 py-2 px-4 bg-primary text-white rounded-lg">
          Confirmar
        </button>
      </form>
    </div>
  );
}

export default MultipleChoiceQuestion;
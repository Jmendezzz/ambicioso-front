import { useEffect, useState } from 'react';
import { Question } from '../models/Question';
import { getMultipleChoiceQuestion, getTrueFalseQuestion } from '../services/ambiciosoService';

export function useGetQuestion() {
  const [question, setQuestion] = useState<Question | undefined>(undefined);

  useEffect(() => {
    const questionType = Math.random() > 0.5 ? 'boolean' : 'multiple';

    if (questionType === 'boolean') {
      getTrueFalseQuestion().then((question) => setQuestion(question));
    } else {
      getMultipleChoiceQuestion().then((question) => setQuestion(question));
    }
  }, []);

  return question;
}

import { Question } from '../models/Question';
import { TOPICS } from '../utils/constants/GameConstants';

const apiUrl = 'http://localhost:5000';

export function getDiceNumber(): Promise<number | null> {
  return fetch(`${apiUrl}/get-score`).then((response) => response.json());
}

export function getTrueFalseQuestion(): Promise<Question> {
  return fetch(`${apiUrl}/generate-true-false`, {
    headers: {
        'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      topic: getRandomTopic(),
    }),
  }).then((response) => response.json());
}

export function getMultipleChoiceQuestion(): Promise<Question> {
    return fetch(`${apiUrl}/generate-multiple-choice`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
        topic: getRandomTopic(),
        }),
    }).then((response) => response.json());
}

function getRandomTopic(): string {
  return TOPICS[Math.floor(Math.random() * TOPICS.length)];
}

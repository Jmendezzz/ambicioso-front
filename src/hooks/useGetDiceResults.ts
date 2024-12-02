import { useState } from 'react';
import { getDiceNumber } from '../services/ambiciosoService';

export function useGetDiceResults() {
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const getDiceNumberResult = async () => {
    setLoading(true);
    getDiceNumber()
      .then((response) => {
        console.log('Dice number response', response);
        setResult(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error getting dice number', error);
        setLoading(false);
      });
  };

  return { result, loading, getDiceNumberResult };
}

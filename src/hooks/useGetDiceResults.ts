import { useState } from 'react';
import { getDiceNumber } from '../services/ambiciosoService';

export function useGetDiceResults() {
  const [result, setResult] = useState(0);
  const [loading, setLoading] = useState(true);

  const getDiceNumberResult = async () => {
    getDiceNumber()
      .then((response) => {
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

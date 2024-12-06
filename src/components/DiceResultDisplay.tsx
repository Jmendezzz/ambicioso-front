import React from 'react';
import DiceLoading from './DiceLoading';

interface ResultDisplayProps {
  countdown: number;
  loading: boolean;
  result: number | null;
  playerName: string | undefined;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ countdown, loading, result, playerName }) => {
  return (
    <div className="absolute w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl text-white bg-black/50 border-8 border-black flex flex-col justify-center items-center">
      {countdown > 0 && <span>{countdown}</span>}
      {loading && <DiceLoading />}
      {!loading && result !== null && (
        <span className="text-center text-3xl">
          El jugador{' '}
          <span className="text-primary font-extrabold">{playerName}</span>{' '}
          ha obtenido un puntaje de:{' '}
          <span className="text-primary font-extrabold">{result}</span>
        </span>
      )}
      {result === null && !loading && (
        <span className="text-lg">
          No se detectaron resultados presiona{' '}
          <span className="text-primary font-bold">Espacio</span> para intentar de nuevo
        </span>
      )}
    </div>
  );
};

export default ResultDisplay;
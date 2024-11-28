import { useGameContext } from '../contexts/GameContext';
import { MAXIMUM_SCORE } from '../utils/constants/GameConstants';
import ProgressBar from './ProgressBar';

function GeneralScore() {
  const { state } = useGameContext();
  state.players.sort((a, b) => b.score - a.score);


  return (
    <div className="flex flex-col gap-8 justify-center  min-w-[400px]">
      <h2 className='text-center text-5xl'>Puntuación</h2>
        <ul className='space-y-4'>
            {state.players.map((player) => (
            <li key={player.id}>
                <span className='text-2xl'>{player.name}</span>
                <ProgressBar progress={player.score} total={MAXIMUM_SCORE}/>
            </li>
            ))}
        </ul>
    </div>
  );
}

export default GeneralScore;

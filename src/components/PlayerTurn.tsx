import { useGameContext } from '../contexts/GameContext';
import VideoStream from './VideoStream';

function PlayerTurn() {
  const { state } = useGameContext();
  const currentPlayer = state.players.find(
    (player) => player.id === state.currentPlayerId
  );

  return (
    <div className="flex flex-col gap-8 items-center">
      <h2 className="text-4xl">Turno del jugador <span className='text-primary'> {currentPlayer?.name}</span></h2>
      <VideoStream />
    </div>
  );
}

export default PlayerTurn;

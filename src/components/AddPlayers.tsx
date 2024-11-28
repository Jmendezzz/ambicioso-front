import { useGameContext } from '../contexts/GameContext';
import { GameActionsTypes } from '../reducers/gameReducer';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';
import Button from './Button';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function AddPlayers() {
  const { dispatch, state } = useGameContext();

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const players = state.players.map((player) => {
      if (player.id === id) {
        return { ...player, name: e.target.value };
      }
      return player;
    });
    dispatch({ type: GameActionsTypes.UPDATE_PLAYERS, payload: players });
  };

  const handleAddPlayer = () => {
    const newPlayer = {
      id: state.players.length + 1,
      name: `Jugador ${state.players.length + 1}`,
      score: 0,
    };
    dispatch({ type: GameActionsTypes.ADD_PLAYER, player: newPlayer });
  };

  const onGameStart = () => {
    dispatch({ type: GameActionsTypes.START });
  }

  const numPlayers = state.players.length;
  const gridColsClass =
    numPlayers === 0
      ? 'grid-cols-1'
      : numPlayers === 1
      ? 'grid-cols-1'
      : numPlayers === 2
      ? 'grid-cols-2'
      : 'grid-cols-3';

  return (
    <motion.section
      className="container flex flex-col gap-8 w-full justify-center items-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-6xl text-center antialiased stroke-primary font-extrabold">
        JUGADORES
      </h2>
      <div
        className={`grid ${gridColsClass} gap-4 w-full max-w-4xl justify-items-center`}
      >
        {state.players.map((player) => (
          <motion.div
            key={player.id}
            className="flex text-2xl justify-center items-center w-full"
            variants={itemVariants}
          >
            <input
              className="text-center w-full hover:border-white transition focus:border-white focus:shadow-lg backdrop-filter backdrop-blur-lg bg-blur border-3 rounded-sm py-2 border-primary outline-primary"
              onChange={(e) => handleNameChange(e, player.id)}
              placeholder="Nombre del Jugador"
              value={player.name}
            />
          </motion.div>
        ))}
        <div className="col-span-full flex justify-center">
          <button
            onClick={handleAddPlayer}
            className="text-3xl cursor-pointer px-4 py-2 border-2 border-dashed border-gray-200 text-gray-200 rounded transition hover:bg-primary hover:text-white"
            id="add-player"
          >
            +
          </button>
          <Tooltip place="bottom" anchorSelect="#add-player">
            Agregar Jugador
          </Tooltip>
        </div>

      </div>
      <div className="w-full flex justify-center mt-10">
          <Button onClick={onGameStart}>EMPEZAR PARTIDA!</Button>
        </div>
    </motion.section>
  );
}
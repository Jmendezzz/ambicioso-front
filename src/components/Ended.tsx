import Confetti from "react-confetti";
import { useGameContext } from "../contexts/GameContext";

function Ended() {
  const { state } = useGameContext();
  const sortedPlayers = [...state.players].sort((a, b) => b.score - a.score);
  const topThreePlayers = sortedPlayers.slice(0, 3);


  return (
    <div className="flex flex-col items-center gap-12">
      <section>
        <h2 className="text-6xl text-center">
          ¡El ganador es <span className="text-primary">{topThreePlayers[0].name}</span>!
        </h2>
        <div className="flex justify-center items-end gap-4 mt-8">
          {topThreePlayers.map((player, index) => (
            <div
              key={player.id}
              className={`flex flex-col items-center ${
                index === 0 ? "order-2" : index === 1 ? "order-1" : "order-3"
              }`}
            >
              <div
                className={`bg-primary text-white p-4 rounded-t-lg ${
                  index === 0 ? "h-40" : index === 1 ? "h-32" : "h-24"
                } flex items-end justify-center`}
              >
                <span className="text-2xl font-bold">{player.name}</span>
              </div>
              <div className="bg-gray-200 w-full h-4 rounded-b-lg"></div>
              <span className="mt-2 text-xl font-bold">{player.score} puntos</span>
            </div>
          ))}
        </div>
      </section>
      <div className="absolute top-0 overflow-hidden w-full h-full">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}      
      />
      </div>

    </div>
  );
}

export default Ended;
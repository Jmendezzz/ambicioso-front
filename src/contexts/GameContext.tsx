import React, { createContext, ReactNode, useReducer } from 'react';
import { GameState } from '../models/GameState';
import { GameAction, GameContextState, gameReducer } from '../reducers/gameReducer';

export interface GameContextType {
  state: GameContextState;
  dispatch: React.Dispatch<GameAction>;
}

const initialState: GameContextState = {
    gameState: GameState.NOT_STARTED,
    players: [
        { id: 1, name: 'Jugador 1', score: 20 },
        { id: 2, name: 'Jugador 2', score: 0 },
    ],
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameContextProvider({ children }: { readonly children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  
  const value = React.useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const context = React.useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameContextProvider');
  }
  return context;
}

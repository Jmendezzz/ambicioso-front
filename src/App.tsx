import Game from './components/Game'

import { GameContextProvider } from './contexts/GameContext'

function App() {

  return (
    <main>
      <GameContextProvider>
        <Game />
      </GameContextProvider>
    </main>
  )
}

export default App

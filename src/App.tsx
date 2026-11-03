import { useState } from 'react';
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import Tracker from './components/Tracker';
import { Screen } from './types/game';

function App() {
  const [screen, setScreen] = useState<Screen>('start');

  const handleGameOver = (score: number, day: number) => {
    console.log(`Game Over! Score: ${score}, Days: ${day}`);
    setScreen('start');
  };

  const handleNavigate = (newScreen: Screen) => {
    setScreen(newScreen);
  };

  switch (screen) {
    case 'start':
      return (
        <StartScreen
          onStartGame={() => setScreen('game')}
          onOpenTracker={() => setScreen('tracker')}
        />
      );
    case 'game':
      return (
        <Game
          onBack={() => setScreen('start')}
          onGameOver={handleGameOver}
          onNavigate={handleNavigate}
        />
      );
    case 'tracker':
      return <Tracker onBack={() => setScreen('start')} />;
    default:
      return (
        <StartScreen
          onStartGame={() => setScreen('game')}
          onOpenTracker={() => setScreen('tracker')}
        />
      );
  }
}

export default App;

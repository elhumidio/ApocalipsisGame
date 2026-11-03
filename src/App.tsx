import { useState } from 'react';
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import Tracker from './components/Tracker';
import { Screen } from './types/game';

function App() {
  const [screen, setScreen] = useState<Screen>('start');
  const [lastScore, setLastScore] = useState(0);
  const [lastDay, setLastDay] = useState(0);

  const handleGameOver = (score: number, day: number) => {
    setLastScore(score);
    setLastDay(day);
    setScreen('start');
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

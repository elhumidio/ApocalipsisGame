import { useState, useEffect, useCallback } from 'react';
import { GameState, GameEvent, Choice } from '../types/game';
import { gameEvents, locations } from '../data/events';

interface GameProps {
  onBack: () => void;
  onGameOver: (score: number, day: number) => void;
}

const initialGameState: GameState = {
  day: 1,
  resources: {
    food: 60,
    water: 60,
    health: 80,
    morale: 50,
    fuel: 40,
    ammo: 20,
  },
  survivors: [],
  currentLocation: 'base',
  discoveredLocations: ['base'],
  eventHistory: [],
  flags: {},
  isGameOver: false,
  gameOverReason: '',
  score: 0,
};

export default function Game({ onBack, onGameOver }: GameProps) {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [currentEvent, setCurrentEvent] = useState<GameEvent | null>(null);
  const [showOutcome, setShowOutcome] = useState(false);
  const [outcomeText, setOutcomeText] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [dayTransition, setDayTransition] = useState(false);

  const getRandomEvent = useCallback((day: number, history: string[]): GameEvent => {
    const available = gameEvents.filter(
      e => !history.includes(e.id) && (!e.minDay || day >= e.minDay)
    );
    if (available.length === 0) {
      // Reset history if all events played
      const allAvailable = gameEvents.filter(e => !e.minDay || day >= e.minDay);
      return allAvailable[Math.floor(Math.random() * allAvailable.length)];
    }
    return available[Math.floor(Math.random() * available.length)];
  }, []);

  const startNewDay = useCallback(() => {
    setDayTransition(true);
    setTimeout(() => {
      const event = getRandomEvent(gameState.day, gameState.eventHistory);
      setCurrentEvent(event);
      setShowOutcome(false);
      setDayTransition(false);
    }, 1500);
  }, [gameState.day, gameState.eventHistory, getRandomEvent]);

  useEffect(() => {
    if (!showIntro && !currentEvent && !gameState.isGameOver) {
      startNewDay();
    }
  }, [gameState.day, showIntro, currentEvent, gameState.isGameOver, startNewDay]);

  // Check game over conditions
  useEffect(() => {
    const { resources } = gameState;
    if (resources.food <= 0) {
      setGameState(prev => ({ ...prev, isGameOver: true, gameOverReason: 'Tu grupo murió de hambre. No quedaba comida.' }));
    } else if (resources.water <= 0) {
      setGameState(prev => ({ ...prev, isGameOver: true, gameOverReason: 'La deshidratación acabó con todos. Sin agua no hay esperanza.' }));
    } else if (resources.health <= 0) {
      setGameState(prev => ({ ...prev, isGameOver: true, gameOverReason: 'Las heridas y enfermedades fueron demasiado. El grupo sucumbió.' }));
    } else if (resources.morale <= 0) {
      setGameState(prev => ({ ...prev, isGameOver: true, gameOverReason: 'La desesperación ganó. El grupo se disolvió. Cada uno por su cuenta.' }));
    }
  }, [gameState.resources]);

  useEffect(() => {
    if (gameState.isGameOver) {
      setTimeout(() => {
        onGameOver(gameState.score, gameState.day);
      }, 2000);
    }
  }, [gameState.isGameOver, gameState.score, gameState.day, onGameOver]);

  const handleChoice = (choice: Choice) => {
    setOutcomeText(choice.outcome);
    setShowOutcome(true);

    setGameState(prev => {
      const newResources = { ...prev.resources };
      
      // Apply effects
      if (choice.effects.food) newResources.food = Math.max(0, Math.min(100, newResources.food + choice.effects.food));
      if (choice.effects.water) newResources.water = Math.max(0, Math.min(100, newResources.water + choice.effects.water));
      if (choice.effects.health) newResources.health = Math.max(0, Math.min(100, newResources.health + choice.effects.health));
      if (choice.effects.morale) newResources.morale = Math.max(0, Math.min(100, newResources.morale + choice.effects.morale));
      if (choice.effects.fuel) newResources.fuel = Math.max(0, Math.min(100, newResources.fuel + choice.effects.fuel));
      if (choice.effects.ammo) newResources.ammo = Math.max(0, Math.min(100, newResources.ammo + choice.effects.ammo));

      // Daily consumption
      newResources.food = Math.max(0, newResources.food - 3);
      newResources.water = Math.max(0, newResources.water - 4);

      // Discover new location randomly
      const newDiscovered = [...prev.discoveredLocations];
      if (Math.random() > 0.6) {
        const undiscovered = locations.filter(l => !newDiscovered.includes(l.id));
        if (undiscovered.length > 0) {
          const newLoc = undiscovered[Math.floor(Math.random() * undiscovered.length)];
          newDiscovered.push(newLoc.id);
        }
      }

      const newScore = prev.score + 10 + Math.floor(Math.random() * 20);

      return {
        ...prev,
        day: prev.day + 1,
        resources: newResources,
        eventHistory: [...prev.eventHistory, currentEvent?.id || ''],
        discoveredLocations: newDiscovered,
        score: newScore,
      };
    });

    setTimeout(() => {
      setCurrentEvent(null);
      setShowOutcome(false);
    }, 4000);
  };

  const getResourceColor = (value: number) => {
    if (value > 60) return 'bg-green-500';
    if (value > 30) return 'bg-yellow-500';
    if (value > 15) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getResourceIcon = (key: string) => {
    const icons: Record<string, string> = {
      food: '🍖',
      water: '💧',
      health: '❤️',
      morale: '😊',
      fuel: '⛽',
      ammo: '🔫',
    };
    return icons[key] || '❓';
  };

  // Intro screen
  if (showIntro) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4">
        <div className="max-w-md text-center">
          <div className="text-6xl mb-6 animate-float">🌍</div>
          <h2 className="text-2xl font-bold text-red-400 mb-4">DÍA 1 — EL COMIENZO DEL FIN</h2>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5 text-left space-y-3 text-sm text-gray-300">
            <p>El mundo que conocías ya no existe.</p>
            <p>Los terremotos han destruido las ciudades. Los eclipses han oscurecido el cielo. Las guerras han devastado naciones.</p>
            <p>Eres el líder de un pequeño grupo de supervivientes. Tu misión: <span className="text-red-400 font-bold">sobrevivir el mayor número de días posible.</span></p>
            <p>Cada día traerá nuevos desafíos. Cada decisión tendrá consecuencias. No hay vuelta atrás.</p>
            <div className="border-t border-gray-700 pt-3 mt-3">
              <p className="text-xs text-gray-500">💡 Consejo: Mantén todos los recursos equilibrados. Si uno llega a cero, es el fin.</p>
            </div>
          </div>
          <button
            onClick={() => setShowIntro(false)}
            className="mt-6 w-full py-4 bg-red-700 hover:bg-red-600 text-white font-bold rounded-xl transition-all active:scale-95"
          >
            COMENZAR SUPERVIVENCIA ⚔️
          </button>
        </div>
      </div>
    );
  }

  // Day transition
  if (dayTransition) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4">
        <div className="text-center animate-pulse">
          <div className="text-6xl mb-4">🌅</div>
          <h2 className="text-3xl font-bold text-white">DÍA {gameState.day}</h2>
          <p className="text-gray-400 mt-2">Un nuevo amanecer en el apocalipsis...</p>
        </div>
      </div>
    );
  }

  // Game over
  if (gameState.isGameOver) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-7xl mb-4">💀</div>
          <h2 className="text-3xl font-bold text-red-500 mb-2">HAS CAÍDO</h2>
          <p className="text-gray-400 mb-6">{gameState.gameOverReason}</p>
          <div className="bg-gray-900/50 border border-red-900/30 rounded-xl p-4 mb-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-red-400">{gameState.day}</div>
                <div className="text-xs text-gray-500">DÍAS SOBREVIVIDOS</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-400">{gameState.score}</div>
                <div className="text-xs text-gray-500">PUNTUACIÓN</div>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 italic">"El fin llega para todos. Solo algunos lo ven venir."</p>
        </div>
      </div>
    );
  }

  // Map view
  if (showMap) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">🗺️ Mapa del Mundo</h2>
          <button
            onClick={() => setShowMap(false)}
            className="px-4 py-2 bg-gray-800 rounded-lg text-sm text-gray-300"
          >
            ← Volver
          </button>
        </div>
        <div className="grid gap-3">
          {locations.filter(l => gameState.discoveredLocations.includes(l.id)).map(loc => (
            <div
              key={loc.id}
              className={`bg-gray-900/50 border rounded-xl p-4 ${
                loc.id === gameState.currentLocation ? 'border-red-600/50 bg-red-950/20' : 'border-gray-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{loc.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white">{loc.name}</h3>
                    {loc.id === gameState.currentLocation && (
                      <span className="text-xs bg-red-600/20 text-red-400 px-2 py-0.5 rounded">📍 AQUÍ</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400">{loc.description}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded">
                      ⚠️ Peligro: {'🔴'.repeat(loc.danger)}
                    </span>
                    <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded">
                      🎒 {loc.loot.slice(0, 2).join(', ')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-gray-900/50 border border-gray-800 rounded-xl p-3">
          <p className="text-xs text-gray-500 text-center">
            {gameState.discoveredLocations.length}/{locations.length} ubicaciones descubiertas
          </p>
        </div>
      </div>
    );
  }

  // Main game view
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      {/* Top bar - Resources */}
      <div className="sticky top-0 z-20 bg-black/90 backdrop-blur-sm border-b border-gray-800 p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">☠️</span>
            <span className="font-bold text-white text-sm">DÍA {gameState.day}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-orange-400">⭐ {gameState.score}</span>
            <button
              onClick={() => setShowMap(true)}
              className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300"
            >
              🗺️
            </button>
            <button
              onClick={onBack}
              className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300"
            >
              ←
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(gameState.resources).map(([key, value]) => (
            <div key={key} className="flex items-center gap-1">
              <span className="text-xs">{getResourceIcon(key)}</span>
              <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getResourceColor(value)} transition-all duration-500`}
                  style={{ width: `${value}%` }}
                />
              </div>
              <span className="text-xs text-gray-500 w-6 text-right">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Event content */}
      <div className="flex-1 p-4 flex flex-col justify-center">
        {currentEvent && !showOutcome && (
          <div className="animate-slide-in">
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-5 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs px-2 py-0.5 rounded ${
                  currentEvent.category === 'combat' ? 'bg-red-600/20 text-red-400' :
                  currentEvent.category === 'exploration' ? 'bg-blue-600/20 text-blue-400' :
                  currentEvent.category === 'survival' ? 'bg-green-600/20 text-green-400' :
                  currentEvent.category === 'moral' ? 'bg-purple-600/20 text-purple-400' :
                  'bg-orange-600/20 text-orange-400'
                }`}>
                  {currentEvent.category === 'combat' ? '⚔️ Combate' :
                   currentEvent.category === 'exploration' ? '🔍 Exploración' :
                   currentEvent.category === 'survival' ? '🏕️ Supervivencia' :
                   currentEvent.category === 'moral' ? '⚖️ Moral' :
                   '👁️ Sobrenatural'}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{currentEvent.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{currentEvent.description}</p>
            </div>

            <div className="space-y-3">
              {currentEvent.choices.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => handleChoice(choice)}
                  className="w-full text-left p-4 bg-gray-900/30 border border-gray-700/50 rounded-xl hover:border-red-600/50 hover:bg-red-950/20 transition-all active:scale-[0.98]"
                >
                  <span className="text-gray-200 text-sm">{choice.text}</span>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {Object.entries(choice.effects).map(([key, val]) => (
                      <span
                        key={key}
                        className={`text-xs px-1.5 py-0.5 rounded ${
                          (val as number) > 0 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
                        }`}
                      >
                        {getResourceIcon(key)} {(val as number) > 0 ? '+' : ''}{val as number}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {showOutcome && (
          <div className="animate-slide-in text-center">
            <div className="text-5xl mb-4 animate-float">
              {currentEvent?.category === 'combat' ? '⚔️' :
               currentEvent?.category === 'exploration' ? '🔍' :
               currentEvent?.category === 'survival' ? '🏕️' :
               currentEvent?.category === 'moral' ? '⚖️' : '👁️'}
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
              <p className="text-gray-200 leading-relaxed">{outcomeText}</p>
            </div>
            <p className="text-gray-500 text-sm mt-4 animate-pulse">El día continúa...</p>
          </div>
        )}
      </div>

      {/* Bottom info */}
      <div className="p-3 border-t border-gray-800 bg-black/50">
        <div className="flex justify-between text-xs text-gray-500">
          <span>📍 {locations.find(l => l.id === gameState.currentLocation)?.name || 'Refugio'}</span>
          <span>🎒 {gameState.discoveredLocations.length} zonas exploradas</span>
        </div>
      </div>
    </div>
  );
}

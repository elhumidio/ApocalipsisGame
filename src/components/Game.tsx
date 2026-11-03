import { useState, useEffect, useCallback } from 'react';
import { GameState, GameEvent, Choice, Screen, Weather, Achievement, BaseUpgrade } from '../types/game';
import { gameEvents, locations, allSurvivors, weatherTypes, allAchievements, baseUpgrades as baseUpgradesData, radioMessages } from '../data/events';

interface GameProps {
  onBack: () => void;
  onGameOver: (score: number, day: number) => void;
  onNavigate: (screen: Screen) => void;
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
    materials: 15,
    meds: 10,
  },
  survivors: [],
  currentLocation: 'base',
  discoveredLocations: ['base'],
  exploredLocations: ['base'],
  eventHistory: [],
  flags: {},
  isGameOver: false,
  gameOverReason: '',
  gameOverType: 'death',
  score: 0,
  baseUpgrades: baseUpgradesData,
  weather: weatherTypes[0],
  achievements: allAchievements,
  radioMessages: [],
  zombieThreat: 0,
  moralAlignment: 0,
  ending: '',
  kills: 0,
  saved: 0,
  betrayed: 0,
};

export default function Game({ onBack, onGameOver, onNavigate }: GameProps) {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem('apocalypse_save');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialGameState;
      }
    }
    return initialGameState;
  });
  const [currentEvent, setCurrentEvent] = useState<GameEvent | null>(null);
  const [showOutcome, setShowOutcome] = useState(false);
  const [outcomeText, setOutcomeText] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [showBase, setShowBase] = useState(false);
  const [showSurvivors, setShowSurvivors] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showRadio, setShowRadio] = useState(false);
  const [showIntro, setShowIntro] = useState(!localStorage.getItem('apocalypse_save'));
  const [dayTransition, setDayTransition] = useState(false);
  const [notification, setNotification] = useState('');

  // Save game
  useEffect(() => {
    localStorage.setItem('apocalypse_save', JSON.stringify(gameState));
  }, [gameState]);

  // Show notification
  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  // Check achievements
  const checkAchievements = useCallback((state: GameState): Achievement[] => {
    const achievements = [...state.achievements];
    
    if (state.day >= 1 && !achievements.find(a => a.id === 'first_day')?.unlocked) {
      const ach = achievements.find(a => a.id === 'first_day');
      if (ach) ach.unlocked = true;
    }
    if (state.day >= 7 && !achievements.find(a => a.id === 'week_survivor')?.unlocked) {
      const ach = achievements.find(a => a.id === 'week_survivor');
      if (ach) ach.unlocked = true;
    }
    if (state.day >= 14 && !achievements.find(a => a.id === 'two_weeks')?.unlocked) {
      const ach = achievements.find(a => a.id === 'two_weeks');
      if (ach) ach.unlocked = true;
    }
    if (state.day >= 30 && !achievements.find(a => a.id === 'month')?.unlocked) {
      const ach = achievements.find(a => a.id === 'month');
      if (ach) ach.unlocked = true;
    }
    if (state.saved >= 5 && !achievements.find(a => a.id === 'savior')?.unlocked) {
      const ach = achievements.find(a => a.id === 'savior');
      if (ach) ach.unlocked = true;
    }
    if (state.betrayed >= 3 && !achievements.find(a => a.id === 'ruthless')?.unlocked) {
      const ach = achievements.find(a => a.id === 'ruthless');
      if (ach) ach.unlocked = true;
    }
    if (state.kills >= 20 && !achievements.find(a => a.id === 'zombie_slayer')?.unlocked) {
      const ach = achievements.find(a => a.id === 'zombie_slayer');
      if (ach) ach.unlocked = true;
    }
    if (state.discoveredLocations.length === locations.length && !achievements.find(a => a.id === 'collector')?.unlocked) {
      const ach = achievements.find(a => a.id === 'collector');
      if (ach) ach.unlocked = true;
    }
    if (state.baseUpgrades.filter(u => u.built).length >= 5 && !achievements.find(a => a.id === 'builder')?.unlocked) {
      const ach = achievements.find(a => a.id === 'builder');
      if (ach) ach.unlocked = true;
    }
    if (state.resources.morale >= 100 && !achievements.find(a => a.id === 'saint')?.unlocked) {
      const ach = achievements.find(a => a.id === 'saint');
      if (ach) ach.unlocked = true;
    }
    if (state.resources.ammo >= 50 && !achievements.find(a => a.id === 'warlord')?.unlocked) {
      const ach = achievements.find(a => a.id === 'warlord');
      if (ach) ach.unlocked = true;
    }

    return achievements;
  }, []);

  const getRandomEvent = useCallback((day: number, history: string[], zombieThreat: number): GameEvent => {
    let available = gameEvents.filter(
      e => !history.includes(e.id) && (!e.minDay || day >= e.minDay)
    );
    
    // Weight zombie events higher when threat is high
    if (zombieThreat > 50) {
      const zombieEvents = available.filter(e => e.category === 'zombie');
      if (zombieEvents.length > 0 && Math.random() < zombieThreat / 100) {
        return zombieEvents[Math.floor(Math.random() * zombieEvents.length)];
      }
    }

    if (available.length === 0) {
      available = gameEvents.filter(e => !e.minDay || day >= e.minDay);
    }
    
    return available[Math.floor(Math.random() * available.length)];
  }, []);

  const generateWeather = (): Weather => {
    if (gameState.day < 5) return weatherTypes[0];
    if (Math.random() > 0.7) {
      const available = weatherTypes.filter(w => w.type !== 'clear');
      return available[Math.floor(Math.random() * available.length)];
    }
    return weatherTypes[0];
  };

  const startNewDay = useCallback(() => {
    setDayTransition(true);
    setTimeout(() => {
      const event = getRandomEvent(gameState.day, gameState.eventHistory, gameState.zombieThreat);
      setCurrentEvent(event);
      setShowOutcome(false);
      setDayTransition(false);
      
      // Generate weather
      const newWeather = generateWeather();
      
      // Generate radio message
      const newRadioMessages = [...gameState.radioMessages];
      const availableRadio = radioMessages.filter(r => r.day <= gameState.day && !newRadioMessages.find(m => m.id === r.id));
      if (availableRadio.length > 0 && Math.random() > 0.5) {
        newRadioMessages.push(availableRadio[0]);
      }
      
      setGameState(prev => ({
        ...prev,
        weather: newWeather,
        radioMessages: newRadioMessages,
      }));
    }, 1500);
  }, [gameState.day, gameState.eventHistory, gameState.zombieThreat, gameState.radioMessages, getRandomEvent]);

  useEffect(() => {
    if (!showIntro && !currentEvent && !gameState.isGameOver && !showMap && !showBase && !showSurvivors && !showAchievements && !showRadio) {
      startNewDay();
    }
  }, [gameState.day, showIntro, currentEvent, gameState.isGameOver, showMap, showBase, showSurvivors, showAchievements, showRadio, startNewDay]);

  // Check game over
  useEffect(() => {
    const { resources } = gameState;
    if (resources.food <= 0) {
      setGameState(prev => ({ ...prev, isGameOver: true, gameOverReason: 'Tu grupo murió de hambre.', gameOverType: 'death' }));
    } else if (resources.water <= 0) {
      setGameState(prev => ({ ...prev, isGameOver: true, gameOverReason: 'La deshidratación acabó con todos.', gameOverType: 'death' }));
    } else if (resources.health <= 0) {
      setGameState(prev => ({ ...prev, isGameOver: true, gameOverReason: 'Las heridas y enfermedades fueron demasiado.', gameOverType: 'death' }));
    } else if (resources.morale <= 0) {
      setGameState(prev => ({ ...prev, isGameOver: true, gameOverReason: 'La desesperación ganó. El grupo se disolvió.', gameOverType: 'death' }));
    }
  }, [gameState.resources]);

  useEffect(() => {
    if (gameState.isGameOver) {
      setTimeout(() => {
        onGameOver(gameState.score, gameState.day);
      }, 3000);
    }
  }, [gameState.isGameOver, gameState.score, gameState.day, onGameOver]);

  const handleChoice = (choice: Choice) => {
    setOutcomeText(choice.outcome);
    setShowOutcome(true);

    setGameState(prev => {
      const newResources = { ...prev.resources };
      
      // Apply effects
      Object.entries(choice.effects).forEach(([key, val]) => {
        if (key in newResources) {
          newResources[key as keyof typeof newResources] = Math.max(0, Math.min(100, newResources[key as keyof typeof newResources] + (val as number)));
        }
      });

      // Daily consumption
      newResources.food = Math.max(0, newResources.food - 3);
      newResources.water = Math.max(0, newResources.water - 4);

      // Base upgrades effects
      const builtUpgrades = prev.baseUpgrades.filter(u => u.built);
      builtUpgrades.forEach(upgrade => {
        if (upgrade.effect === 'food_gen') newResources.food = Math.min(100, newResources.food + 5);
        if (upgrade.effect === 'water_gen') newResources.water = Math.min(100, newResources.water + 5);
        if (upgrade.effect === 'health_gen') newResources.health = Math.min(100, newResources.health + 5);
        if (upgrade.effect === 'morale_gen') newResources.morale = Math.min(100, newResources.morale + 10);
        if (upgrade.effect === 'ammo_gen') newResources.ammo = Math.min(100, newResources.ammo + 2);
      });

      // Weather effects
      if (prev.weather.effects) {
        Object.entries(prev.weather.effects).forEach(([key, val]) => {
          if (key in newResources) {
            newResources[key as keyof typeof newResources] = Math.max(0, Math.min(100, newResources[key as keyof typeof newResources] + (val as number)));
          }
        });
      }

      // Discover new location
      const newDiscovered = [...prev.discoveredLocations];
      if (Math.random() > 0.6) {
        const undiscovered = locations.filter(l => !newDiscovered.includes(l.id));
        if (undiscovered.length > 0) {
          const newLoc = undiscovered[Math.floor(Math.random() * undiscovered.length)];
          newDiscovered.push(newLoc.id);
          showNotification(`🗺️ Nueva ubicación descubierta: ${newLoc.name}`);
        }
      }

      // Add survivor
      const newSurvivors = [...prev.survivors];
      if (choice.addSurvivor && !newSurvivors.find(s => s.id === choice.addSurvivor!.id)) {
        newSurvivors.push(choice.addSurvivor);
        showNotification(`👥 ${choice.addSurvivor.name} se unió al grupo`);
      }

      // Update flags
      const newFlags = { ...prev.flags };
      if (choice.addFlag) newFlags[choice.addFlag] = true;
      if (choice.removeFlag) delete newFlags[choice.removeFlag];

      // Update moral alignment
      let newMoralAlignment = prev.moralAlignment;
      if (choice.effects.morale && choice.effects.morale > 0) newMoralAlignment += 5;
      if (choice.effects.morale && choice.effects.morale < 0) newMoralAlignment -= 5;

      // Update zombie threat
      let newZombieThreat = prev.zombieThreat + Math.floor(Math.random() * 5);
      if (prev.baseUpgrades.find(u => u.id === 'walls' && u.built)) {
        newZombieThreat = Math.max(0, newZombieThreat - 10);
      }

      const newScore = prev.score + 10 + Math.floor(Math.random() * 20);

      // Check achievements
      const newState = {
        ...prev,
        day: prev.day + 1,
        resources: newResources,
        survivors: newSurvivors,
        eventHistory: [...prev.eventHistory, currentEvent?.id || ''],
        discoveredLocations: newDiscovered,
        flags: newFlags,
        score: newScore,
        moralAlignment: newMoralAlignment,
        zombieThreat: newZombieThreat,
      };

      newState.achievements = checkAchievements(newState);

      return newState;
    });

    setTimeout(() => {
      setCurrentEvent(null);
      setShowOutcome(false);
    }, 4000);
  };

  const buildUpgrade = (upgradeId: string) => {
    setGameState(prev => {
      const newUpgrades = [...prev.baseUpgrades];
      const upgrade = newUpgrades.find(u => u.id === upgradeId);
      if (!upgrade || upgrade.level >= upgrade.maxLevel) return prev;

      const newResources = { ...prev.resources };
      Object.entries(upgrade.cost).forEach(([key, val]) => {
        if (key in newResources) {
          newResources[key as keyof typeof newResources] -= val as number;
          if (newResources[key as keyof typeof newResources] < 0) {
            showNotification('❌ Recursos insuficientes');
            return prev;
          }
        }
      });

      upgrade.level++;
      upgrade.built = true;
      showNotification(`🏗️ ${upgrade.name} construido`);

      return { ...prev, resources: newResources, baseUpgrades: newUpgrades };
    });
  };

  const getResourceColor = (value: number) => {
    if (value > 60) return 'bg-green-500';
    if (value > 30) return 'bg-yellow-500';
    if (value > 15) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getResourceIcon = (key: string) => {
    const icons: Record<string, string> = {
      food: '🍖', water: '💧', health: '❤️', morale: '😊', fuel: '⛽', ammo: '🔫', materials: '🧱', meds: '💊',
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
            <p>Los terremotos han destruido las ciudades. Los eclipses han oscurecido el cielo. Las guerras han devastado naciones. Los muertos caminan.</p>
            <p>Eres el líder de un pequeño grupo de supervivientes. Tu misión: <span className="text-red-400 font-bold">sobrevivir el mayor número de días posible.</span></p>
            <p>Cada día traerá nuevos desafíos. Cada decisión tendrá consecuencias. No hay vuelta atrás.</p>
            <div className="border-t border-gray-700 pt-3 mt-3 space-y-1">
              <p className="text-xs text-gray-500">💡 Construye tu base, recluta supervivientes, investiga la verdad.</p>
              <p className="text-xs text-gray-500">💡 El clima cambia. Los zombis acechan. La radio susurra secretos.</p>
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
          <div className="text-6xl mb-4">{gameState.weather.icon}</div>
          <h2 className="text-3xl font-bold text-white">DÍA {gameState.day}</h2>
          <p className="text-gray-400 mt-2">{gameState.weather.name}</p>
          <p className="text-xs text-gray-500 mt-1">{gameState.weather.description}</p>
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
                <div className="text-xs text-gray-500">DÍAS</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-400">{gameState.score}</div>
                <div className="text-xs text-gray-500">PUNTOS</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">{gameState.kills}</div>
                <div className="text-xs text-gray-500">ZOMBIS</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400">{gameState.saved}</div>
                <div className="text-xs text-gray-500">SALVADOS</div>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('apocalypse_save');
              window.location.reload();
            }}
            className="w-full py-3 bg-red-700 hover:bg-red-600 text-white font-bold rounded-xl"
          >
            REINTENTAR
          </button>
        </div>
      </div>
    );
  }

  // Map view
  if (showMap) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">🗺️ Mapa</h2>
          <button onClick={() => setShowMap(false)} className="px-4 py-2 bg-gray-800 rounded-lg text-sm text-gray-300">← Volver</button>
        </div>
        <div className="grid gap-3">
          {locations.filter(l => gameState.discoveredLocations.includes(l.id)).map(loc => (
            <div key={loc.id} className={`bg-gray-900/50 border rounded-xl p-4 ${loc.id === gameState.currentLocation ? 'border-red-600/50 bg-red-950/20' : 'border-gray-800'}`}>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{loc.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white">{loc.name}</h3>
                    {loc.id === gameState.currentLocation && <span className="text-xs bg-red-600/20 text-red-400 px-2 py-0.5 rounded">📍 AQUÍ</span>}
                  </div>
                  <p className="text-sm text-gray-400">{loc.description}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded">⚠️ {'🔴'.repeat(loc.danger)}</span>
                    <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded">🧟 Nivel: {loc.zombieLevel}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Base view
  if (showBase) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">🏗️ Base</h2>
          <button onClick={() => setShowBase(false)} className="px-4 py-2 bg-gray-800 rounded-lg text-sm text-gray-300">← Volver</button>
        </div>
        <div className="grid gap-3">
          {gameState.baseUpgrades.map(upgrade => (
            <div key={upgrade.id} className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{upgrade.icon}</span>
                  <div>
                    <h3 className="font-bold text-white">{upgrade.name}</h3>
                    <p className="text-xs text-gray-400">{upgrade.description}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">Nv. {upgrade.level}/{upgrade.maxLevel}</span>
              </div>
              {!upgrade.built && upgrade.level < upgrade.maxLevel && (
                <button
                  onClick={() => buildUpgrade(upgrade.id)}
                  className="w-full mt-2 py-2 bg-red-700 hover:bg-red-600 text-white text-sm font-bold rounded-lg"
                >
                  Construir ({Object.entries(upgrade.cost).map(([k, v]) => `${getResourceIcon(k)}${v}`).join(' ')})
                </button>
              )}
              {upgrade.built && <div className="text-xs text-green-400 mt-2">✅ Construido</div>}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Survivors view
  if (showSurvivors) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">👥 Supervivientes</h2>
          <button onClick={() => setShowSurvivors(false)} className="px-4 py-2 bg-gray-800 rounded-lg text-sm text-gray-300">← Volver</button>
        </div>
        {gameState.survivors.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="text-5xl mb-4">👥</div>
            <p>No has reclutado a nadie aún.</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {gameState.survivors.map(survivor => (
              <div key={survivor.id} className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{survivor.avatar}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-white">{survivor.name}</h3>
                    <p className="text-xs text-gray-400">{survivor.description}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs bg-blue-600/20 text-blue-400 px-2 py-0.5 rounded">{survivor.skill}</span>
                      <span className="text-xs bg-green-600/20 text-green-400 px-2 py-0.5 rounded">❤️ {survivor.health}%</span>
                      <span className="text-xs bg-purple-600/20 text-purple-400 px-2 py-0.5 rounded">🤝 {survivor.loyalty}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Achievements view
  if (showAchievements) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">🏆 Logros</h2>
          <button onClick={() => setShowAchievements(false)} className="px-4 py-2 bg-gray-800 rounded-lg text-sm text-gray-300">← Volver</button>
        </div>
        <div className="grid gap-3">
          {gameState.achievements.map(achievement => (
            <div key={achievement.id} className={`bg-gray-900/50 border rounded-xl p-4 ${achievement.unlocked ? 'border-yellow-600/50 bg-yellow-950/20' : 'border-gray-800 opacity-50'}`}>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{achievement.icon}</span>
                <div>
                  <h3 className="font-bold text-white">{achievement.name}</h3>
                  <p className="text-xs text-gray-400">{achievement.description}</p>
                  {achievement.unlocked && <span className="text-xs text-yellow-400">✅ Desbloqueado</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Radio view
  if (showRadio) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">📻 Radio</h2>
          <button onClick={() => setShowRadio(false)} className="px-4 py-2 bg-gray-800 rounded-lg text-sm text-gray-300">← Volver</button>
        </div>
        {gameState.radioMessages.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="text-5xl mb-4">📻</div>
            <p>Solo estática por ahora...</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {gameState.radioMessages.map(msg => (
              <div key={msg.id} className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    msg.type === 'warning' ? 'bg-red-600/20 text-red-400' :
                    msg.type === 'help' ? 'bg-green-600/20 text-green-400' :
                    msg.type === 'intel' ? 'bg-blue-600/20 text-blue-400' :
                    'bg-purple-600/20 text-purple-400'
                  }`}>
                    {msg.type === 'warning' ? '⚠️' : msg.type === 'help' ? '🆘' : msg.type === 'intel' ? '🔍' : '👁️'} {msg.type}
                  </span>
                  <span className="text-xs text-gray-500">Día {msg.day}</span>
                </div>
                <p className="text-sm text-gray-300 italic">"{msg.message}"</p>
                <p className="text-xs text-gray-500 mt-2">— {msg.sender}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Main game view
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-gray-900 border border-red-600/50 rounded-xl px-4 py-2 text-sm text-white animate-slide-in">
          {notification}
        </div>
      )}

      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-black/90 backdrop-blur-sm border-b border-gray-800 p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">{gameState.weather.icon}</span>
            <span className="font-bold text-white text-sm">DÍA {gameState.day}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-orange-400">⭐ {gameState.score}</span>
            <button onClick={() => setShowRadio(true)} className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300">📻</button>
            <button onClick={() => setShowAchievements(true)} className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300">🏆</button>
            <button onClick={() => setShowSurvivors(true)} className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300">👥</button>
            <button onClick={() => setShowBase(true)} className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300">🏗️</button>
            <button onClick={() => setShowMap(true)} className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300">🗺️</button>
            <button onClick={onBack} className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300">←</button>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {Object.entries(gameState.resources).map(([key, value]) => (
            <div key={key} className="flex items-center gap-1">
              <span className="text-xs">{getResourceIcon(key)}</span>
              <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className={`h-full ${getResourceColor(value)} transition-all duration-500`} style={{ width: `${value}%` }} />
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
                  currentEvent.category === 'combat' || currentEvent.category === 'zombie' ? 'bg-red-600/20 text-red-400' :
                  currentEvent.category === 'exploration' ? 'bg-blue-600/20 text-blue-400' :
                  currentEvent.category === 'survival' ? 'bg-green-600/20 text-green-400' :
                  currentEvent.category === 'moral' ? 'bg-purple-600/20 text-purple-400' :
                  currentEvent.category === 'weather' ? 'bg-cyan-600/20 text-cyan-400' :
                  currentEvent.category === 'radio' ? 'bg-yellow-600/20 text-yellow-400' :
                  currentEvent.category === 'npc' ? 'bg-pink-600/20 text-pink-400' :
                  'bg-orange-600/20 text-orange-400'
                }`}>
                  {currentEvent.category === 'combat' || currentEvent.category === 'zombie' ? '⚔️' :
                   currentEvent.category === 'exploration' ? '🔍' :
                   currentEvent.category === 'survival' ? '🏕️' :
                   currentEvent.category === 'moral' ? '⚖️' :
                   currentEvent.category === 'weather' ? '🌦️' :
                   currentEvent.category === 'radio' ? '📻' :
                   currentEvent.category === 'npc' ? '👥' : '👁️'}
                  {' '}{currentEvent.category}
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
                      <span key={key} className={`text-xs px-1.5 py-0.5 rounded ${(val as number) > 0 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
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
              {currentEvent?.category === 'combat' || currentEvent?.category === 'zombie' ? '⚔️' :
               currentEvent?.category === 'exploration' ? '🔍' :
               currentEvent?.category === 'survival' ? '🏕️' :
               currentEvent?.category === 'moral' ? '⚖️' :
               currentEvent?.category === 'weather' ? '🌦️' :
               currentEvent?.category === 'radio' ? '📻' :
               currentEvent?.category === 'npc' ? '👥' : '👁️'}
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
          <span>🧟 Amenaza: {gameState.zombieThreat}%</span>
          <span>🎒 {gameState.discoveredLocations.length} zonas</span>
        </div>
      </div>
    </div>
  );
}

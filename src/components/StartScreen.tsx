import { useState, useEffect } from 'react';

interface StartScreenProps {
  onStartGame: () => void;
  onOpenTracker: () => void;
}

export default function StartScreen({ onStartGame, onOpenTracker }: StartScreenProps) {
  const [showText, setShowText] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const hasSave = !!localStorage.getItem('apocalypse_save');

  useEffect(() => {
    setTimeout(() => setShowText(true), 500);
    setTimeout(() => setShowButtons(true), 1500);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-900/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-900/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-red-500/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-lg w-full">
        <div className={`text-6xl mb-4 transition-all duration-1000 ${showText ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
          <span className="animate-float inline-block">☠️</span>
        </div>

        <h1 className={`text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-600 mb-2 transition-all duration-1000 delay-300 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          EL GRAN JUEGO
        </h1>
        <h2 className={`text-xl md:text-2xl font-bold text-red-400 mb-4 transition-all duration-1000 delay-500 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          DEL APOCALIPSIS
        </h2>

        <p className={`text-gray-400 text-xs md:text-sm mb-6 transition-all duration-1000 delay-700 ${showText ? 'opacity-100' : 'opacity-0'}`}>
          Zombis. Clima letal. Misterios de radio. Bases que construir.<br />
          ¿Podrás sobrevivir y descubrir la verdad?
        </p>

        {/* Features grid */}
        <div className={`grid grid-cols-4 gap-2 mb-6 transition-all duration-1000 delay-900 ${showText ? 'opacity-100' : 'opacity-0'}`}>
          {[
            { icon: '🧟', label: 'Zombis' },
            { icon: '🏗️', label: 'Base' },
            { icon: '📻', label: 'Radio' },
            { icon: '🌦️', label: 'Clima' },
            { icon: '👥', label: 'NPCs' },
            { icon: '🏆', label: 'Logros' },
            { icon: '💾', label: 'Guardar' },
            { icon: '🎭', label: 'Finales' },
          ].map((feat, i) => (
            <div key={i} className="bg-gray-900/50 rounded-lg p-2 border border-gray-800">
              <div className="text-xl mb-0.5">{feat.icon}</div>
              <div className="text-[10px] text-gray-400">{feat.label}</div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className={`space-y-2 transition-all duration-1000 ${showButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {hasSave && (
            <button
              onClick={onStartGame}
              className="w-full py-3 px-6 bg-gradient-to-r from-green-700 to-green-600 hover:from-green-600 hover:to-green-500 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95 border border-green-500/50"
            >
              💾 CONTINUAR PARTIDA
            </button>
          )}
          <button
            onClick={() => {
              localStorage.removeItem('apocalypse_save');
              onStartGame();
            }}
            className="w-full py-3 px-6 bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-bold rounded-xl shadow-lg shadow-red-600/30 transition-all active:scale-95 border border-red-500/50"
          >
            🎮 {hasSave ? 'NUEVA PARTIDA' : 'JUGAR'}
          </button>
          
          <button
            onClick={onOpenTracker}
            className="w-full py-2.5 px-6 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 font-medium rounded-xl border border-gray-700/50 transition-all active:scale-95"
          >
            📡 Rastreador del Apocalipsis
          </button>
        </div>

        <div className={`mt-6 bg-red-950/30 border border-red-900/30 rounded-xl p-3 transition-all duration-1000 delay-1000 ${showText ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-red-300 text-xs italic">
            "Y todo esto será principio de dolores." — Mateo 24:8
          </p>
        </div>
      </div>

      <div className="absolute bottom-4 text-gray-600 text-xs">v2.0 — PWA Instalable</div>
    </div>
  );
}

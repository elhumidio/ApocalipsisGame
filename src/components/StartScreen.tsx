import { useState, useEffect } from 'react';

interface StartScreenProps {
  onStartGame: () => void;
  onOpenTracker: () => void;
}

export default function StartScreen({ onStartGame, onOpenTracker }: StartScreenProps) {
  const [showText, setShowText] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowText(true), 500);
    setTimeout(() => setShowButtons(true), 2000);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-900/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-900/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-950/10 rounded-full blur-3xl"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
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
      <div className="relative z-10 text-center max-w-lg">
        {/* Skull icon */}
        <div className={`text-7xl mb-6 transition-all duration-1000 ${showText ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
          <span className="animate-float inline-block">☠️</span>
        </div>

        {/* Title */}
        <h1 className={`text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-600 mb-4 transition-all duration-1000 delay-300 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          EL GRAN JUEGO
        </h1>
        <h2 className={`text-2xl md:text-3xl font-bold text-red-400 mb-6 transition-all duration-1000 delay-500 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          DEL APOCALIPSIS
        </h2>

        {/* Subtitle */}
        <p className={`text-gray-400 text-sm md:text-base mb-8 transition-all duration-1000 delay-700 ${showText ? 'opacity-100' : 'opacity-0'}`}>
          El mundo ha caído. Las señales se multiplican. <br />
          ¿Podrás sobrevivir al fin de los tiempos?
        </p>

        {/* Flavor text */}
        <div className={`bg-red-950/30 border border-red-900/30 rounded-xl p-4 mb-8 transition-all duration-1000 delay-1000 ${showText ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-red-300 text-xs italic">
            "Y todo esto será principio de dolores." — Mateo 24:8
          </p>
        </div>

        {/* Buttons */}
        <div className={`space-y-3 transition-all duration-1000 ${showButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <button
            onClick={onStartGame}
            className="w-full py-4 px-6 bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-red-600/30 transition-all active:scale-95 border border-red-500/50"
          >
            🎮 JUGAR
          </button>
          
          <button
            onClick={onOpenTracker}
            className="w-full py-3 px-6 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 font-medium rounded-xl border border-gray-700/50 transition-all active:scale-95"
          >
            📡 Ver Rastreador del Apocalipsis
          </button>
        </div>

        {/* Features */}
        <div className={`mt-8 grid grid-cols-3 gap-3 text-center transition-all duration-1000 delay-1200 ${showButtons ? 'opacity-100' : 'opacity-0'}`}>
          <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
            <div className="text-2xl mb-1">⚔️</div>
            <div className="text-xs text-gray-400">Decisiones</div>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
            <div className="text-2xl mb-1">🗺️</div>
            <div className="text-xs text-gray-400">Exploración</div>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
            <div className="text-2xl mb-1">💀</div>
            <div className="text-xs text-gray-400">Supervivencia</div>
          </div>
        </div>
      </div>

      {/* Version */}
      <div className="absolute bottom-4 text-gray-600 text-xs">
        v1.0 — PWA Instalable
      </div>
    </div>
  );
}

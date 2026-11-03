import { useState, useEffect } from 'react';

interface Earthquake {
  id: string;
  magnitude: number;
  place: string;
  time: number;
  coordinates: [number, number, number];
  url: string;
}

interface TrackerProps {
  onBack: () => void;
}

const eclipseData = [
  { date: '2024-04-08', type: 'Solar Total', location: 'Norteamérica', description: 'Gran eclipse solar total cruzó México, EE.UU. y Canadá', severity: 'high' as const },
  { date: '2025-03-29', type: 'Solar Parcial', location: 'Europa, África, Asia', description: 'Eclipse solar parcial visible desde múltiples continentes', severity: 'medium' as const },
  { date: '2025-09-21', type: 'Lunar Total', location: 'Global', description: 'Luna de sangre visible desde América, Europa y África', severity: 'high' as const },
  { date: '2026-08-12', type: 'Solar Total', location: 'Ártico, España', description: 'Eclipse total cruzará el Atlántico hasta España', severity: 'high' as const },
];

const warData = [
  { name: 'Conflicto Rusia-Ucrania', startYear: 2022, status: 'Activo', region: 'Europa del Este', casualties: '500,000+', description: 'Mayor conflicto en Europa desde la WWII.' },
  { name: 'Conflicto Israel-Gaza', startYear: 2023, status: 'Activo', region: 'Medio Oriente', casualties: '50,000+', description: 'Escalada masiva con riesgo de expansión.' },
  { name: 'Guerra Civil de Sudán', startYear: 2023, status: 'Activo', region: 'África', casualties: '150,000+', description: 'Crisis humanitaria con millones de desplazados.' },
  { name: 'Tensiones China-Taiwán', startYear: 2022, status: 'Escalando', region: 'Asia-Pacífico', casualties: 'N/A', description: 'Ejercicios militares chinos rodeando Taiwán.' },
];

const bloodMoonData = [
  { date: '2024-09-18', name: 'Luna de Sangre', description: 'Eclipse lunar total. La luna se tiñó de rojo sangre.', visible: 'Américas, Europa' },
  { date: '2025-09-07', name: 'Tétrada de Luna de Sangre', description: 'Cuarta luna de sangre consecutiva - señal profética.', visible: 'Asia, Pacífico' },
  { date: '2026-03-03', name: 'Luna de Sangre', description: 'Eclipse lunar total con luna roja intensa.', visible: 'Asia, Australia' },
];

const otherSigns = [
  { title: 'Erupción Hunga Tonga', date: '2022', category: 'Volcanes', description: 'La erupción submarina más potente en décadas.', icon: '🌋' },
  { title: 'Olas de calor récord', date: '2024', category: 'Clima', description: 'Temperaturas globales rompieron récords 14 meses seguidos.', icon: '🔥' },
  { title: 'Terremoto Turquía', date: '2023', category: 'Terremotos', description: 'Magnitud 7.8. Más de 50,000 muertos.', icon: '💀' },
  { title: 'Incendios masivos', date: '2024', category: 'Clima', description: 'Incendios devastadores en Canadá, Chile, Grecia y Hawái.', icon: '🔥' },
  { title: 'Inestabilidad económica', date: '2024', category: 'Economía', description: 'Inflación global, deudas récord, riesgo de colapso.', icon: '💸' },
  { title: 'Ciberataques globales', date: '2024', category: 'Tecnología', description: 'Ataques a infraestructura crítica mundial.', icon: '💻' },
];

export default function Tracker({ onBack }: TrackerProps) {
  const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('terremotos');
  const [doomsdayLevel] = useState(73);

  useEffect(() => {
    fetchEarthquakes();
  }, []);

  const fetchEarthquakes = async () => {
    try {
      const response = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson');
      const data = await response.json();
      const quakes = data.features.map((f: any) => ({
        id: f.id,
        magnitude: f.properties.mag,
        place: f.properties.place,
        time: f.properties.time,
        coordinates: f.geometry.coordinates,
        url: f.properties.url,
      }));
      setEarthquakes(quakes);
    } catch {
      setEarthquakes([
        { id: '1', magnitude: 7.2, place: 'Costa de Japón', time: Date.now() - 3600000, coordinates: [140, 35, 10], url: '#' },
        { id: '2', magnitude: 6.8, place: 'Chile Central', time: Date.now() - 7200000, coordinates: [-71, -33, 15], url: '#' },
        { id: '3', magnitude: 7.5, place: 'Papúa Nueva Guinea', time: Date.now() - 10800000, coordinates: [150, -6, 20], url: '#' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'terremotos', label: '🌍', count: earthquakes.length },
    { id: 'eclipses', label: '🌑', count: eclipseData.length },
    { id: 'lunas', label: '🔴', count: bloodMoonData.length },
    { id: 'guerras', label: '⚔️', count: warData.length },
    { id: 'otras', label: '☠️', count: otherSigns.length },
  ];

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('es-ES', {
      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-red-900/30 bg-black/90 backdrop-blur-sm">
        <div className="px-4 py-3 flex items-center justify-between">
          <button onClick={onBack} className="px-3 py-1.5 bg-gray-800 rounded-lg text-sm text-gray-300">
            ← Volver
          </button>
          <h1 className="text-lg font-bold text-red-400">📡 Rastreador</h1>
          <div className="w-16"></div>
        </div>
      </header>

      {/* Doomsday Index */}
      <div className="px-4 py-4">
        <div className="bg-gradient-to-r from-red-950/50 via-black to-red-950/50 rounded-xl p-4 border border-red-900/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl animate-float">☠️</span>
              <div>
                <div className="text-xs text-red-400 font-bold">ÍNDICE APOCALIPSIS</div>
                <div className={`text-2xl font-bold ${doomsdayLevel >= 70 ? 'text-red-500' : 'text-orange-500'}`}>
                  {doomsdayLevel}%
                </div>
              </div>
            </div>
            <div className="w-32">
              <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-600 rounded-full transition-all"
                  style={{ width: `${doomsdayLevel}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-red-600 text-white'
                : 'bg-gray-800/50 text-gray-400 border border-gray-700/50'
            }`}
          >
            {tab.label} <span className="text-xs opacity-70">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-4 overflow-y-auto">
        {activeTab === 'terremotos' && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white mb-2">Terremotos Significativos</h3>
            {loading ? (
              <div className="text-center py-8">
                <div className="text-3xl animate-spin inline-block">🌍</div>
                <p className="text-gray-400 mt-2 text-sm">Consultando sismógrafos...</p>
              </div>
            ) : (
              earthquakes.map(quake => (
                <a
                  key={quake.id}
                  href={quake.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gray-900/50 border border-gray-800 rounded-xl p-3 active:scale-[0.98] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ${
                      quake.magnitude >= 7 ? 'bg-red-600/20 text-red-400 border border-red-600/50' :
                      quake.magnitude >= 6 ? 'bg-orange-600/20 text-orange-400 border border-orange-600/50' :
                      'bg-yellow-600/20 text-yellow-400 border border-yellow-600/50'
                    }`}>
                      {quake.magnitude?.toFixed(1)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-white text-sm truncate">{quake.place}</div>
                      <div className="text-xs text-gray-500">{formatDate(quake.time)}</div>
                    </div>
                  </div>
                </a>
              ))
            )}
          </div>
        )}

        {activeTab === 'eclipses' && (
          <div className="space-y-3">
            {eclipseData.map((e, i) => (
              <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span>{e.type.includes('Solar') ? '☀️' : '🌕'}</span>
                  <span className="font-bold text-white text-sm">{e.type}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${
                    e.severity === 'high' ? 'bg-red-600/20 text-red-400' : 'bg-yellow-600/20 text-yellow-400'
                  }`}>{e.severity === 'high' ? '⚠️' : '🔶'}</span>
                </div>
                <p className="text-xs text-gray-400">{e.description}</p>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>📅 {e.date}</span>
                  <span>📍 {e.location}</span>
                </div>
              </div>
            ))}
            <div className="bg-purple-950/30 border border-purple-800/30 rounded-xl p-3">
              <p className="text-xs text-purple-300 italic">"El sol se convertirá en tinieblas y la luna en sangre." - Joel 2:31</p>
            </div>
          </div>
        )}

        {activeTab === 'lunas' && (
          <div className="space-y-3">
            {bloodMoonData.map((moon, i) => (
              <div key={i} className="bg-gradient-to-r from-red-950/30 to-gray-900/50 border border-red-900/30 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl animate-float">🌕</span>
                  <div>
                    <h4 className="font-bold text-red-400 text-sm">{moon.name}</h4>
                    <p className="text-xs text-gray-300 mt-1">{moon.description}</p>
                    <div className="text-xs text-gray-500 mt-1">📅 {moon.date} • 👁️ {moon.visible}</div>
                  </div>
                </div>
              </div>
            ))}
            <div className="bg-red-950/30 border border-red-800/30 rounded-xl p-3">
              <p className="text-xs text-red-300 italic">"Habrá señales en el sol, en la luna y en las estrellas." - Lucas 21:25</p>
            </div>
          </div>
        )}

        {activeTab === 'guerras' && (
          <div className="space-y-3">
            {warData.map((war, i) => (
              <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-white text-sm">{war.name}</h4>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${
                    war.status === 'Activo' ? 'bg-red-600/20 text-red-400' : 'bg-orange-600/20 text-orange-400'
                  }`}>{war.status}</span>
                </div>
                <p className="text-xs text-gray-400">{war.description}</p>
                <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
                  <span className="text-gray-500">Desde: {war.startYear}</span>
                  <span className="text-gray-500">{war.region}</span>
                  <span className="text-red-400 font-bold">💀 {war.casualties}</span>
                </div>
              </div>
            ))}
            <div className="bg-red-950/30 border border-red-800/30 rounded-xl p-3">
              <p className="text-xs text-red-300 italic">"Se levantará nación contra nación, y reino contra reino." - Mateo 24:7</p>
            </div>
          </div>
        )}

        {activeTab === 'otras' && (
          <div className="space-y-3">
            {otherSigns.map((sign, i) => (
              <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{sign.icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white text-sm">{sign.title}</h4>
                      <span className="text-xs bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded">{sign.category}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{sign.description}</p>
                    <span className="text-xs text-gray-600">{sign.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

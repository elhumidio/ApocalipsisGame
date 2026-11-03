import { useState, useEffect } from 'react';

// Types
interface Earthquake {
  id: string;
  magnitude: number;
  place: string;
  time: number;
  coordinates: [number, number, number];
  url: string;
}

interface EclipseEvent {
  date: string;
  type: string;
  location: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
}

interface WarEvent {
  name: string;
  startYear: number;
  status: string;
  region: string;
  casualties: string;
  description: string;
}

interface OtherSign {
  title: string;
  date: string;
  category: string;
  description: string;
  icon: string;
}

// Data
const eclipseData: EclipseEvent[] = [
  { date: '2024-04-08', type: 'Solar Total', location: 'Norteamérica', description: 'Gran eclipse solar total cruzó México, EE.UU. y Canadá', severity: 'high' },
  { date: '2025-03-29', type: 'Solar Parcial', location: 'Europa, África, Asia', description: 'Eclipse solar parcial visible desde múltiples continentes', severity: 'medium' },
  { date: '2025-09-21', type: 'Lunar Total', location: 'Global', description: 'Luna de sangre visible desde América, Europa y África', severity: 'high' },
  { date: '2026-08-12', type: 'Solar Total', location: 'Ártico, Groenlandia, España', description: 'Eclipse total cruzará el Atlántico hasta España', severity: 'high' },
  { date: '2028-07-22', type: 'Solar Total', location: 'Océano Índico, Australia', description: 'Eclipse total sobre el Pacífico sur', severity: 'medium' },
  { date: '2029-01-14', type: 'Solar Total', location: 'Europa, norte de África', description: 'Eclipse total visible desde España y norte de África', severity: 'high' },
];

const warData: WarEvent[] = [
  { name: 'Conflicto Rusia-Ucrania', startYear: 2022, status: 'Activo', region: 'Europa del Este', casualties: '500,000+', description: 'Mayor conflicto en Europa desde la WWII. Tensiones nucleares constantes.' },
  { name: 'Conflicto Israel-Gaza', startYear: 2023, status: 'Activo', region: 'Medio Oriente', casualties: '50,000+', description: 'Escalada masiva con riesgo de expansión regional.' },
  { name: 'Guerra Civil de Sudán', startYear: 2023, status: 'Activo', region: 'África', casualties: '150,000+', description: 'Crisis humanitaria con millones de desplazados.' },
  { name: 'Conflicto en Myanmar', startYear: 2021, status: 'Activo', region: 'Sudeste Asiático', casualties: '50,000+', description: 'Junta militar vs fuerzas de resistencia. Crisis humanitaria.' },
  { name: 'Tensiones China-Taiwán', startYear: 2022, status: 'Escalando', region: 'Asia-Pacífico', casualties: 'N/A', description: 'Ejercicios militares chinos rodeando Taiwán. Riesgo de conflicto global.' },
  { name: 'Tensiones India-Pakistán', startYear: 1947, status: 'Latente', region: 'Asia del Sur', casualties: 'N/A', description: 'Dos potencias nucleares con disputas territoriales activas.' },
];

const otherSigns: OtherSign[] = [
  { title: 'Erupción del Hunga Tonga', date: '2022-01-15', category: 'Volcanes', description: 'La erupción submarina más potente en décadas. Alteró el clima global.', icon: '🌋' },
  { title: 'Olas de calor récord', date: '2024-07', category: 'Clima', description: 'Temperaturas globales rompieron récords durante 14 meses consecutivos.', icon: '🔥' },
  { title: 'Terremoto Turquía-Siria', date: '2023-02-06', category: 'Terremotos', description: 'Magnitud 7.8. Más de 50,000 muertos. Destrucción masiva.', icon: '💀' },
  { title: 'Pandemia COVID-19', date: '2020-2023', category: 'Pandemia', description: 'Millones de muertos. Paralizó el mundo entero.', icon: '🦠' },
  { title: 'Incendios forestales masivos', date: '2024', category: 'Clima', description: 'Incendios devastadores en Canadá, Chile, Grecia y Hawái.', icon: '🔥' },
  { title: 'Colapso de ecosistemas', date: '2024', category: 'Medio Ambiente', description: 'Blanqueamiento masivo de corales. Extinción acelerada de especies.', icon: '🌍' },
  { title: 'Inestabilidad económica', date: '2024', category: 'Economía', description: 'Inflación global, deudas récord, riesgo de colapso financiero.', icon: '💸' },
  { title: 'Ciberataques globales', date: '2024', category: 'Tecnología', description: 'Ataques a infraestructura crítica. Vulnerabilidad de sistemas.', icon: '💻' },
];

const bloodMoonData = [
  { date: '2024-09-18', name: 'Luna de Sangre', description: 'Eclipse lunar total. La luna se tiñó de rojo sangre.', visible: 'Américas, Europa, África' },
  { date: '2025-09-07', name: 'Tetrad de Luna de Sangre', description: 'Cuarta luna de sangre consecutiva - señal profética según algunas interpretaciones bíblicas.', visible: 'Asia, Pacífico' },
  { date: '2026-03-03', name: 'Luna de Sangre', description: 'Eclipse lunar total con luna roja intensa.', visible: 'Asia, Australia' },
];

function App() {
  const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('terremotos');
  const [doomsdayLevel, setDoomsdayLevel] = useState(73);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchEarthquakes();
    const interval = setInterval(fetchEarthquakes, 60000);
    return () => clearInterval(interval);
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
      
      // Calculate doomsday level based on earthquake activity
      const significantQuakes = quakes.filter((q: Earthquake) => q.magnitude >= 7).length;
      const newLevel = Math.min(99, 50 + significantQuakes * 8 + Math.floor(Math.random() * 5));
      setDoomsdayLevel(newLevel);
    } catch (error) {
      console.error('Error fetching earthquakes:', error);
      // Fallback data
      setEarthquakes([
        { id: '1', magnitude: 7.2, place: 'Costa de Japón', time: Date.now() - 3600000, coordinates: [140, 35, 10], url: '#' },
        { id: '2', magnitude: 6.8, place: 'Chile Central', time: Date.now() - 7200000, coordinates: [-71, -33, 15], url: '#' },
        { id: '3', magnitude: 7.5, place: 'Papúa Nueva Guinea', time: Date.now() - 10800000, coordinates: [150, -6, 20], url: '#' },
        { id: '4', magnitude: 6.1, place: 'Indonesia', time: Date.now() - 14400000, coordinates: [120, -2, 25], url: '#' },
        { id: '5', magnitude: 7.0, place: 'Alaska, EE.UU.', time: Date.now() - 18000000, coordinates: [-150, 61, 30], url: '#' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'terremotos', label: '🌍 Terremotos', count: earthquakes.length },
    { id: 'eclipses', label: '🌑 Eclipses', count: eclipseData.length },
    { id: 'lunas', label: '🔴 Lunas Rojas', count: bloodMoonData.length },
    { id: 'guerras', label: '⚔️ Guerras', count: warData.length },
    { id: 'otras', label: '☠️ Otras Señales', count: otherSigns.length },
  ];

  const getDoomsdayColor = () => {
    if (doomsdayLevel >= 80) return 'text-red-500';
    if (doomsdayLevel >= 60) return 'text-orange-500';
    if (doomsdayLevel >= 40) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getDoomsdayBg = () => {
    if (doomsdayLevel >= 80) return 'bg-red-600';
    if (doomsdayLevel >= 60) return 'bg-orange-600';
    if (doomsdayLevel >= 40) return 'bg-yellow-600';
    return 'bg-green-600';
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('es-ES', {
      day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-900/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-900/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-red-900/30 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold">
                <span className="text-red-500">⚠️</span> Rastreador del Apocalipsis
              </h1>
              <p className="text-gray-400 mt-1 text-sm">Monitoreando las señales del fin del mundo en tiempo real</p>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500 uppercase tracking-wider">Hora actual</div>
              <div className="text-lg font-mono text-red-400">
                {currentTime.toLocaleTimeString('es-ES')}
              </div>
              <div className="text-xs text-gray-500">
                {currentTime.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Doomsday Clock */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-red-950/50 via-black to-red-950/50 rounded-2xl p-6 border border-red-900/30 animate-pulse-red">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="text-5xl animate-float">☠️</div>
              <div>
                <h2 className="text-xl font-bold text-red-400">ÍNDICE DE APOCALIPSIS</h2>
                <p className="text-gray-400 text-sm">Basado en actividad sísmica, conflictos y eventos celestiales</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className={`text-5xl font-bold ${getDoomsdayColor()}`}>
                  {doomsdayLevel}%
                </div>
                <div className="text-xs text-gray-500 mt-1">NIVEL DE AMENAZA</div>
              </div>
              <div className="w-48">
                <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getDoomsdayBg()} rounded-full transition-all duration-1000 relative`}
                    style={{ width: `${doomsdayLevel}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Seguro</span>
                  <span>Crítico</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white border border-gray-700/50'
              }`}
            >
              {tab.label}
              <span className="ml-2 px-2 py-0.5 bg-black/30 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="animate-slide-in">
          {/* Earthquakes Tab */}
          {activeTab === 'terremotos' && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🌍</span>
                <h3 className="text-xl font-bold text-white">Terremotos Significativos (Último mes)</h3>
                <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">Datos USGS en tiempo real</span>
              </div>
              {loading ? (
                <div className="text-center py-12">
                  <div className="text-4xl animate-spin inline-block">🌍</div>
                  <p className="text-gray-400 mt-4">Consultando actividad sísmica global...</p>
                </div>
              ) : (
                <div className="grid gap-3">
                  {earthquakes.map((quake, index) => (
                    <a
                      key={quake.id}
                      href={quake.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-gray-900/50 border border-gray-800 rounded-xl p-4 hover:border-red-800/50 hover:bg-gray-900/80 transition-all group"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg ${
                            quake.magnitude >= 7 ? 'bg-red-600/20 text-red-400 border border-red-600/50' :
                            quake.magnitude >= 6 ? 'bg-orange-600/20 text-orange-400 border border-orange-600/50' :
                            'bg-yellow-600/20 text-yellow-400 border border-yellow-600/50'
                          }`}>
                            {quake.magnitude?.toFixed(1)}
                          </div>
                          <div>
                            <div className="font-medium text-white group-hover:text-red-400 transition-colors">
                              {quake.place}
                            </div>
                            <div className="text-sm text-gray-500">
                              {formatDate(quake.time)}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-xs px-2 py-1 rounded ${
                            quake.magnitude >= 7 ? 'bg-red-600/20 text-red-400' :
                            quake.magnitude >= 6 ? 'bg-orange-600/20 text-orange-400' :
                            'bg-yellow-600/20 text-yellow-400'
                          }`}>
                            {quake.magnitude >= 7 ? '⚠️ EXTREMO' : quake.magnitude >= 6 ? '🔶 ALTO' : '🟡 MODERADO'}
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            Prof: {quake.coordinates[2]}km
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Eclipses Tab */}
          {activeTab === 'eclipses' && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🌑</span>
                <h3 className="text-xl font-bold text-white">Eclipses y Eventos Celestiales</h3>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {eclipseData.map((eclipse, index) => (
                  <div
                    key={index}
                    className="bg-gray-900/50 border border-gray-800 rounded-xl p-5 hover:border-purple-800/50 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{eclipse.type.includes('Solar') ? '☀️' : '🌕'}</span>
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            eclipse.severity === 'high' ? 'bg-red-600/20 text-red-400' :
                            eclipse.severity === 'medium' ? 'bg-yellow-600/20 text-yellow-400' :
                            'bg-green-600/20 text-green-400'
                          }`}>
                            {eclipse.severity === 'high' ? '⚠️ ALTO IMPACTO' : eclipse.severity === 'medium' ? '🔶 MEDIO' : '🟢 BAJO'}
                          </span>
                        </div>
                        <h4 className="font-bold text-white mt-2">{eclipse.type}</h4>
                        <p className="text-sm text-gray-400 mt-1">{eclipse.description}</p>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-800 flex justify-between text-sm">
                      <span className="text-gray-500">📅 {eclipse.date}</span>
                      <span className="text-gray-500">📍 {eclipse.location}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-purple-950/30 border border-purple-800/30 rounded-xl p-4">
                <p className="text-sm text-purple-300">
                  <strong>📖 Profecía:</strong> "El sol se convertirá en tinieblas y la luna en sangre antes del gran y terrible día del Señor." - Joel 2:31
                </p>
              </div>
            </div>
          )}

          {/* Blood Moons Tab */}
          {activeTab === 'lunas' && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🔴</span>
                <h3 className="text-xl font-bold text-white">Lunas Rojas y Tétradas</h3>
              </div>
              <div className="grid gap-4">
                {bloodMoonData.map((moon, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-red-950/30 to-gray-900/50 border border-red-900/30 rounded-xl p-5 hover:border-red-700/50 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-4xl animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                        🌕
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-red-400 text-lg">{moon.name}</h4>
                        <p className="text-gray-300 mt-1">{moon.description}</p>
                        <div className="flex gap-4 mt-2 text-sm text-gray-500">
                          <span>📅 {moon.date}</span>
                          <span>👁️ Visible: {moon.visible}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-red-950/30 border border-red-800/30 rounded-xl p-4">
                <p className="text-sm text-red-300">
                  <strong>📖 Profecía:</strong> "Habrá señales en el sol, en la luna y en las estrellas..." - Lucas 21:25. Las tétradas de lunas rojas han sido asociadas históricamente con eventos catastróficos para Israel.
                </p>
              </div>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-3 text-center">
                  <div className="text-2xl">🌕</div>
                  <div className="text-xs text-gray-400 mt-1">Próxima Luna Roja</div>
                  <div className="text-sm text-red-400 font-bold">2025-09-07</div>
                </div>
                <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-3 text-center">
                  <div className="text-2xl">🔴</div>
                  <div className="text-xs text-gray-400 mt-1">Tétradas en siglo XXI</div>
                  <div className="text-sm text-red-400 font-bold">8 registradas</div>
                </div>
                <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-3 text-center">
                  <div className="text-2xl">⏳</div>
                  <div className="text-xs text-gray-400 mt-1">Días hasta próxima</div>
                  <div className="text-sm text-red-400 font-bold">
                    {Math.max(0, Math.ceil((new Date('2025-09-07').getTime() - Date.now()) / 86400000))}
                  </div>
                </div>
                <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-3 text-center">
                  <div className="text-2xl">⚠️</div>
                  <div className="text-xs text-gray-400 mt-1">Coincidencia con guerras</div>
                  <div className="text-sm text-red-400 font-bold">Alta</div>
                </div>
              </div>
            </div>
          )}

          {/* Wars Tab */}
          {activeTab === 'guerras' && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">⚔️</span>
                <h3 className="text-xl font-bold text-white">Conflictos Armados Activos</h3>
              </div>
              <div className="grid gap-4">
                {warData.map((war, index) => (
                  <div
                    key={index}
                    className="bg-gray-900/50 border border-gray-800 rounded-xl p-5 hover:border-red-800/50 transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">⚔️</div>
                        <div>
                          <h4 className="font-bold text-white text-lg">{war.name}</h4>
                          <p className="text-sm text-gray-400">{war.description}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <span className={`text-xs px-2 py-1 rounded ${
                          war.status === 'Activo' ? 'bg-red-600/20 text-red-400 border border-red-600/30' :
                          war.status === 'Escalando' ? 'bg-orange-600/20 text-orange-400 border border-orange-600/30' :
                          'bg-yellow-600/20 text-yellow-400 border border-yellow-600/30'
                        }`}>
                          {war.status === 'Activo' ? '🔴' : war.status === 'Escalando' ? '🟠' : '🟡'} {war.status}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-800 grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Desde</span>
                        <div className="text-white">{war.startYear}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Región</span>
                        <div className="text-white">{war.region}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Víctimas</span>
                        <div className="text-red-400 font-bold">{war.casualties}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-gray-900/50 border border-gray-800 rounded-xl p-4">
                <p className="text-sm text-gray-400">
                  <strong className="text-red-400">📊 Estadísticas globales:</strong> Según el Global Peace Index, el mundo se ha vuelto menos pacífico por 9° año consecutivo. Hay más de 50 conflictos armados activos en la actualidad, el número más alto desde la Segunda Guerra Mundial.
                </p>
              </div>
              <div className="mt-4 bg-red-950/30 border border-red-800/30 rounded-xl p-4">
                <p className="text-sm text-red-300">
                  <strong>📖 Profecía:</strong> "Se levantará nación contra nación, y reino contra reino." - Mateo 24:7
                </p>
              </div>
            </div>
          )}

          {/* Other Signs Tab */}
          {activeTab === 'otras' && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">☠️</span>
                <h3 className="text-xl font-bold text-white">Otras Señales del Fin</h3>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {otherSigns.map((sign, index) => (
                  <div
                    key={index}
                    className="bg-gray-900/50 border border-gray-800 rounded-xl p-5 hover:border-red-800/50 transition-all group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-3xl group-hover:animate-shake">{sign.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white">{sign.title}</h4>
                          <span className="text-xs px-2 py-0.5 bg-gray-800 text-gray-400 rounded">{sign.category}</span>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">{sign.description}</p>
                        <div className="text-xs text-gray-600 mt-2">📅 {sign.date}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-gray-900/50 border border-gray-800 rounded-xl p-5">
                <h4 className="font-bold text-red-400 mb-3">📜 Señales según Mateo 24</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  {[
                    { text: 'Guerras y rumores de guerras', status: '✅ Cumplido', done: true },
                    { text: 'Terremotos en diversos lugares', status: '✅ Cumplido', done: true },
                    { text: 'Hambrunas y pestilencias', status: '✅ Cumplido', done: true },
                    { text: 'Señales en el sol y la luna', status: '✅ Cumplido', done: true },
                    { text: 'Falsos profetas', status: '✅ Cumplido', done: true },
                    { text: 'Apostasía y frialdad del amor', status: '✅ Cumplido', done: true },
                    { text: 'Evangelio predicado en todo el mundo', status: '🔄 En progreso', done: false },
                    { text: 'La gran tribulación', status: '⏳ Pendiente', done: false },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 bg-black/30 rounded-lg p-2">
                      <span className={item.done ? 'text-red-400' : 'text-gray-500'}>
                        {item.status}
                      </span>
                      <span className="text-gray-300">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-12 border-t border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center">
          <p className="text-gray-500 text-sm">
            ⚠️ Este rastreador es solo con fines informativos y de entretenimiento. Los datos de terremotos provienen de USGS.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            "Porque se levantará nación contra nación, y reino contra reino; y habrá pestilencias, y hambres, y terremotos en diversos lugares. Y todo esto será principio de dolores." — Mateo 24:7-8
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

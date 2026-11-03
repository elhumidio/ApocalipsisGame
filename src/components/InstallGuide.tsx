import { useState } from 'react';

interface InstallGuideProps {
  onClose: () => void;
}

export default function InstallGuide({ onClose }: InstallGuideProps) {
  const [activeTab, setActiveTab] = useState<'android' | 'ios' | 'apk'>('android');

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#1a1a1a] rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-800">
        {/* Header */}
        <div className="sticky top-0 bg-[#1a1a1a] border-b border-gray-800 p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">📱 Instalar App</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">×</button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-800">
          <button
            onClick={() => setActiveTab('android')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'android' ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-500'
            }`}
          >
            🤖 Android
          </button>
          <button
            onClick={() => setActiveTab('ios')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'ios' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-500'
            }`}
          >
            🍎 iPhone
          </button>
          <button
            onClick={() => setActiveTab('apk')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'apk' ? 'text-red-400 border-b-2 border-red-400' : 'text-gray-500'
            }`}
          >
            📦 APK
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {activeTab === 'android' && (
            <div className="space-y-4">
              <div className="bg-green-950/30 border border-green-800/30 rounded-xl p-3">
                <p className="text-green-300 text-sm font-bold mb-1">✅ Método Recomendado</p>
                <p className="text-green-200 text-xs">Instalar como PWA es más fácil y se actualiza automáticamente</p>
              </div>

              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                  <div>
                    <p className="text-white text-sm font-medium">Abre Chrome</p>
                    <p className="text-gray-400 text-xs">Navega a la URL de esta app en Chrome</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
                  <div>
                    <p className="text-white text-sm font-medium">Toca el menú ⋮</p>
                    <p className="text-gray-400 text-xs">Tres puntos en la esquina superior derecha</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
                  <div>
                    <p className="text-white text-sm font-medium">"Instalar aplicación"</p>
                    <p className="text-gray-400 text-xs">O "Añadir a pantalla de inicio"</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">4</div>
                  <div>
                    <p className="text-white text-sm font-medium">¡Listo! ☠️</p>
                    <p className="text-gray-400 text-xs">La app aparecerá en tu pantalla de inicio</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-3">
                <p className="text-xs text-gray-400">💡 <strong>Ventajas:</strong> No necesita Play Store, se actualiza sola, ocupa poco espacio</p>
              </div>
            </div>
          )}

          {activeTab === 'ios' && (
            <div className="space-y-4">
              <div className="bg-blue-950/30 border border-blue-800/30 rounded-xl p-3">
                <p className="text-blue-300 text-sm font-bold mb-1">✅ Método Recomendado</p>
                <p className="text-blue-200 text-xs">Instalar como PWA desde Safari</p>
              </div>

              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                  <div>
                    <p className="text-white text-sm font-medium">Abre Safari</p>
                    <p className="text-gray-400 text-xs">Navega a la URL de esta app en Safari</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
                  <div>
                    <p className="text-white text-sm font-medium">Toca Compartir</p>
                    <p className="text-gray-400 text-xs">El ícono cuadrado con flecha hacia arriba</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
                  <div>
                    <p className="text-white text-sm font-medium">"Añadir a pantalla de inicio"</p>
                    <p className="text-gray-400 text-xs">Desplázate hacia abajo y toca esta opción</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">4</div>
                  <div>
                    <p className="text-white text-sm font-medium">Toca "Añadir"</p>
                    <p className="text-gray-400 text-xs">En la esquina superior derecha</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">5</div>
                  <div>
                    <p className="text-white text-sm font-medium">¡Listo! ☠️</p>
                    <p className="text-gray-400 text-xs">La app aparecerá en tu pantalla de inicio</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-3">
                <p className="text-xs text-gray-400">💡 <strong>Nota:</strong> Solo funciona con Safari, no con Chrome en iOS</p>
              </div>
            </div>
          )}

          {activeTab === 'apk' && (
            <div className="space-y-4">
              <div className="bg-red-950/30 border border-red-800/30 rounded-xl p-3">
                <p className="text-red-300 text-sm font-bold mb-1">⚠️ Método Avanzado</p>
                <p className="text-red-200 text-xs">Requiere Android Studio y conocimientos técnicos</p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="bg-gray-900/50 rounded-lg p-3">
                  <p className="text-white font-medium mb-1">Requisitos:</p>
                  <ul className="text-gray-400 text-xs space-y-1">
                    <li>• Node.js 18+ instalado</li>
                    <li>• Android Studio instalado</li>
                    <li>• Java JDK 17+ instalado</li>
                    <li>• Variables de entorno configuradas</li>
                  </ul>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-3">
                  <p className="text-white font-medium mb-2">Pasos:</p>
                  <ol className="text-gray-400 text-xs space-y-2">
                    <li><span className="text-red-400">1.</span> Clona/descarga el proyecto</li>
                    <li><span className="text-red-400">2.</span> Ejecuta: <code className="bg-black/50 px-1 rounded">npm install</code></li>
                    <li><span className="text-red-400">3.</span> Ejecuta: <code className="bg-black/50 px-1 rounded">npm run build</code></li>
                    <li><span className="text-red-400">4.</span> Ejecuta: <code className="bg-black/50 px-1 rounded">npx cap add android</code></li>
                    <li><span className="text-red-400">5.</span> Ejecuta: <code className="bg-black/50 px-1 rounded">npx cap sync android</code></li>
                    <li><span className="text-red-400">6.</span> Ejecuta: <code className="bg-black/50 px-1 rounded">npx cap open android</code></li>
                    <li><span className="text-red-400">7.</span> En Android Studio: Build → Generate Signed APK</li>
                  </ol>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-3">
                  <p className="text-white font-medium mb-1">Resultado:</p>
                  <p className="text-gray-400 text-xs">El APK estará en: <code className="bg-black/50 px-1 rounded">android/app/release/app-release.apk</code></p>
                </div>
              </div>

              <div className="bg-yellow-950/30 border border-yellow-800/30 rounded-xl p-3">
                <p className="text-yellow-300 text-xs">💡 <strong>Alternativa más fácil:</strong> Usa PWABuilder.com para generar el APK automáticamente desde la URL de tu PWA</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-[#1a1a1a] border-t border-gray-800 p-4">
          <button
            onClick={onClose}
            className="w-full py-3 bg-red-700 hover:bg-red-600 text-white font-bold rounded-xl transition-all active:scale-95"
          >
            Entendido 👍
          </button>
        </div>
      </div>
    </div>
  );
}

# ☠️ El Gran Juego del Apocalipsis

## 📱 Cómo Instalar en tu Móvil

### Opción 1: Instalar como PWA (Más Fácil - Recomendado)

#### En Android (Chrome/Edge):
1. Abre la app en **Chrome**
2. Toca el menú **⋮** (tres puntos arriba a la derecha)
3. Selecciona **"Instalar aplicación"** o **"Añadir a pantalla de inicio"**
4. Confirma tocando **"Instalar"**
5. ¡Listo! La app aparecerá en tu pantalla de inicio como una app nativa

#### En iPhone/iPad (Safari):
1. Abre la app en **Safari**
2. Toca el botón **Compartir** (cuadrado con flecha hacia arriba)
3. Desplázate y toca **"Añadir a pantalla de inicio"**
4. Toca **"Añadir"** en la esquina superior derecha
5. ¡Listo! La app aparecerá en tu pantalla de inicio

**Ventajas de PWA:**
- ✅ No necesita Play Store ni App Store
- ✅ Se actualiza automáticamente
- ✅ Ocupa menos espacio que un APK
- ✅ Funciona offline
- ✅ Acceso a notificaciones push (futuro)

---

### Opción 2: Generar APK para Android (Avanzado)

Si quieres un archivo `.apk` real para distribuir o instalar manualmente:

#### Requisitos:
- Node.js 18+ instalado
- Android Studio instalado
- Java JDK 17+ instalado
- Variables de entorno configuradas (`ANDROID_HOME`, `JAVA_HOME`)

#### Pasos:

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Compilar la app web:**
   ```bash
   npm run build
   ```

3. **Inicializar Capacitor (solo primera vez):**
   ```bash
   npx cap add android
   ```

4. **Sincronizar archivos web con Android:**
   ```bash
   npx cap sync android
   ```

5. **Abrir en Android Studio:**
   ```bash
   npx cap open android
   ```

6. **En Android Studio:**
   - Espera a que termine de sincronizar
   - Ve a **Build → Generate Signed Bundle / APK**
   - Selecciona **APK**
   - Crea un keystore nuevo o usa uno existente
   - Selecciona **release**
   - Espera a que termine el build

7. **El APK estará en:**
   ```
   android/app/release/app-release.apk
   ```

#### Instalar el APK:
1. Copia el archivo `app-release.apk` a tu teléfono
2. Activa **"Orígenes desconocidos"** en Ajustes → Seguridad
3. Toca el archivo APK desde tu teléfono
4. Confirma la instalación

---

## 🎮 Características del Juego

### Mecánicas Implementadas:
- 🧟 **Sistema de Zombis** - Hordas, nidos, amenaza creciente
- 👥 **8 NPCs Reclutables** - Cada uno con habilidades únicas
- 🏗️ **10 Mejoras de Base** - Huerto, enfermería, armería, laboratorio...
- 📻 **Radio Misteriosa** - 8 mensajes que revelan la verdad
- 🌦️ **Clima Dinámico** - 7 tipos de clima con efectos
- 🎭 **Finales Múltiples** - Bueno, malo, secreto
- 🏆 **15 Logros** - Desbloqueables según tus acciones
- 💾 **Guardado Automático** - Continúa donde lo dejaste
- 🗺️ **9 Ubicaciones** - Explora el mundo post-apocalíptico
- 📊 **8 Recursos** - Comida, agua, salud, moral, combustible, munición, materiales, medicinas

### El Rastreador del Apocalipsis:
- 🌍 Terremotos en tiempo real (API USGS)
- 🌑 Eclipses y eventos celestiales
- 🔴 Lunas rojas y tétradas
- ⚔️ Conflictos bélicos activos
- ☠️ Otras señales del fin

---

## 🛠️ Desarrollo

### Tecnologías:
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS
- Capacitor (para APK)
- PWA (Progressive Web App)

### Comandos:
```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Capacitor: Sincronizar con Android
npx cap sync android

# Capacitor: Abrir en Android Studio
npx cap open android
```

---

## 📄 Licencia

Este proyecto es solo para fines educativos y de entretenimiento.

---

## 🙏 Créditos

Desarrollado con ☠️ por un amante del apocalipsis

**Versión:** 2.0
**Última actualización:** 2026

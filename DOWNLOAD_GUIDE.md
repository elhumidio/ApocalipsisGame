# 📥 Cómo Descargar y Usar la App del Apocalipsis

## 🎯 Método 1: Descargar ZIP (Más Fácil)

### Paso 1: Descargar archivos
Como la app está en este entorno, necesitas descargar todos los archivos. Aquí te explico cómo:

1. **Copia estos archivos a tu computadora:**
   - Todo el contenido de la carpeta `src/`
   - `index.html`
   - `package.json`
   - `vite.config.ts`
   - `tsconfig.json`
   - `tailwind.config.js`
   - `postcss.config.js`
   - `capacitor.config.json`

2. **Crea una carpeta nueva** llamada `apocalipsis-game`

3. **Pega todos los archivos** en esa carpeta manteniendo la estructura

### Paso 2: Instalar dependencias
Abre terminal en esa carpeta y ejecuta:
```bash
npm install
```

### Paso 3: Ejecutar la app
```bash
npm run dev
```

Se abrirá en tu navegador en `http://localhost:5173`

---

## 🌐 Método 2: Desplegar Online (Para acceder desde el móvil)

### Opción A: Vercel (Gratis y Fácil)

1. Ve a [vercel.com](https://vercel.com)
2. Crea una cuenta con GitHub
3. Sube tu proyecto a un repositorio de GitHub
4. En Vercel, haz click en "New Project"
5. Selecciona tu repositorio
6. Click en "Deploy"
7. ¡Listo! Tendrás una URL como `https://apocalipsis-game.vercel.app`
8. Abre esa URL en tu móvil y sigue las instrucciones de instalación PWA

### Opción B: Netlify (También Gratis)

1. Ve a [netlify.com](https://netlify.com)
2. Arrastra la carpeta `dist/` (después de hacer `npm run build`)
3. Obtendrás una URL instantánea
4. Abre esa URL en tu móvil

### Opción C: GitHub Pages (Gratis)

1. Sube tu código a GitHub
2. Ve a Settings → Pages
3. Selecciona la rama `main` y carpeta `/dist`
4. Tu app estará en `https://tu-usuario.github.io/nombre-repo`

---

## 📱 Método 3: Probar Localmente en tu Móvil

Si quieres probar la app en tu móvil sin desplegarla online:

### Requisitos:
- Tu computadora y móvil deben estar en la misma red WiFi

### Pasos:
1. En tu computadora, ejecuta:
   ```bash
   npm run dev -- --host
   ```

2. Te dará una URL como `http://192.168.1.100:5173`

3. Abre esa URL en el navegador de tu móvil

4. ¡Listo! Puedes probar la app en tu móvil

---

## 🎮 Método 4: Usar la App Directamente Aquí

Si solo quieres jugar ahora mismo sin instalar nada:

1. La app ya está construida y funcionando en este entorno
2. Puedes jugar directamente desde el preview
3. El progreso se guarda automáticamente en tu navegador

---

## 📦 Estructura de Archivos Necesarios

```
apocalipsis-game/
├── public/
│   ├── manifest.json
│   ├── sw.js
│   ├── icon-192.svg
│   └── icon-512.svg
├── src/
│   ├── components/
│   │   ├── Game.tsx
│   │   ├── StartScreen.tsx
│   │   ├── Tracker.tsx
│   │   └── InstallGuide.tsx
│   ├── data/
│   │   └── events.ts
│   ├── types/
│   │   └── game.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── capacitor.config.json
└── README.md
```

---

## 🚀 Pasos Rápidos (Resumen)

### Para jugar YA:
```bash
# 1. Copia todos los archivos
# 2. Instala dependencias
npm install

# 3. Ejecuta
npm run dev

# 4. Abre http://localhost:5173
```

### Para instalar en el móvil:
```bash
# 1. Despliega en Vercel/Netlify (ver arriba)
# 2. Abre la URL en tu móvil
# 3. Sigue las instrucciones de instalación PWA
```

### Para generar APK:
```bash
npm install
npm run build
npx cap add android
npx cap sync android
npx cap open android
# Luego en Android Studio: Build → Generate Signed APK
```

---

## ❓ ¿Problemas?

### Error: "npm no reconocido"
- Instala Node.js desde [nodejs.org](https://nodejs.org)

### Error: "Puerto ocupado"
- Cambia el puerto: `npm run dev -- --port 3000`

### La app no carga en el móvil
- Asegúrate de estar en la misma red WiFi
- Verifica que la URL sea accesible desde el móvil

---

## 🎯 Recomendación

**Para probar rápido:** Usa Método 3 (probar localmente en móvil)

**Para uso permanente:** Usa Método 2 (desplegar en Vercel/Netlify)

**Para distribuir:** Usa el método de generar APK con Capacitor

---

¿Necesitas ayuda con algún paso específico? ¡Dime y te ayudo! ☠️

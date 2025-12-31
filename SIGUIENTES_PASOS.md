# 🎉 Capacitor Instalado Exitosamente

Tu app "El Impostor" ahora está lista para ser compilada como app nativa de Android!

---

## ✅ Lo que se instaló

### Dependencias Core
- ✅ `@capacitor/core` - Runtime base de Capacitor
- ✅ `@capacitor/cli` - Herramientas CLI
- ✅ `@capacitor/android` - Soporte Android

### Plugins Nativos
- ✅ `@capacitor/app` - Lifecycle de la app
- ✅ `@capacitor/haptics` - Vibración táctil
- ✅ `@capacitor/status-bar` - Control de barra de estado
- ✅ `@capacitor/splash-screen` - Pantalla de inicio

### Archivos Creados
- ✅ `capacitor.config.ts` - Configuración de Capacitor
- ✅ `android/` - Proyecto Android nativo completo
- ✅ `src/hooks/useNativeFeatures.ts` - Hook para manejar features nativas
- ✅ App.tsx actualizado con integración de Capacitor

---

## 🚀 Próximos Pasos

### 1. Instalar Android Studio (si no lo tienes)

Descarga e instala desde: https://developer.android.com/studio

**Componentes necesarios durante instalación:**
- ✅ Android SDK
- ✅ Android SDK Platform
- ✅ Android Virtual Device (para emulador)

### 2. Abrir el proyecto en Android Studio

```bash
npx cap open android
```

Esto abrirá Android Studio con tu proyecto nativo.

**Primera vez:**
- Android Studio descargará dependencias (puede tardar 5-10 min)
- Espera a que termine "Gradle Build"
- Verás el elefante de Gradle en la esquina inferior derecha

### 3. Compilar tu primera APK

#### Opción A: Desde Android Studio (Recomendado)

1. Espera a que Gradle termine de sincronizar
2. Menu: **Build → Build Bundle(s) / APK(s) → Build APK(s)**
3. Espera a que compile (1-3 minutos primera vez)
4. Verás notificación: "APK(s) generated successfully"
5. Click en **locate** para ver tu APK

**Ubicación del APK:**
```
android/app/build/outputs/apk/debug/app-debug.apk
```

#### Opción B: Desde línea de comandos

```bash
cd android
./gradlew assembleDebug
```

### 4. Probar en tu celular

#### Habilitar modo desarrollador en Android:

1. **Configuración → Acerca del teléfono**
2. Toca **Número de compilación** 7 veces
3. Verás mensaje: "Eres desarrollador"
4. **Configuración → Sistema → Opciones de desarrollador**
5. Activa **Depuración USB**

#### Conectar y ejecutar:

1. Conecta tu celular por USB
2. Acepta "Permitir depuración USB" en tu celular
3. En Android Studio: Click en **Run** ▶️ (botón verde)
4. Selecciona tu dispositivo
5. La app se instalará y abrirá automáticamente

### 5. Testing de Features Nativas

Cuando corras la app en tu celular, deberías ver:

- ✅ **Status Bar** con color naranja (#FF6B35)
- ✅ **Splash Screen** naranja durante 2 segundos
- ✅ **Console log**: "Running on: android (Native)"

Para probar vibración, puedes agregar esto temporalmente en cualquier botón:

```typescript
import { useNativeFeatures } from '../hooks/useNativeFeatures';

// En tu componente
const { vibrate } = useNativeFeatures();

// En el onClick de un botón
onClick={() => {
  vibrate(ImpactStyle.Medium);
  // resto de tu lógica
}}
```

---

## 📝 Comandos Útiles

### Desarrollo

```bash
# Desarrollo web normal (sin cambios)
npm run dev

# Build para producción
npm run build

# Sincronizar cambios con Android (después de build)
npx cap sync

# Abrir Android Studio
npx cap open android

# Build + sync en un comando
npm run build && npx cap sync
```

### Debugging

```bash
# Ver logs de Android en tiempo real
npx cap run android

# O desde adb
adb logcat
```

### Limpiar cache de Capacitor

```bash
npx cap sync --force
```

---

## 🎨 Personalización Adicional

### Cambiar ícono de la app

1. Crea un ícono PNG de 1024x1024px
2. Usa herramienta: https://icon.kitchen/ o https://capacitorjs.com/docs/guides/splash-screens-and-icons
3. Reemplaza archivos en `android/app/src/main/res/mipmap-*/ic_launcher.png`

### Cambiar nombre de la app

Edita `android/app/src/main/res/values/strings.xml`:

```xml
<string name="app_name">El Impostor</string>
<string name="title_activity_main">El Impostor</string>
```

### Cambiar splash screen

Edita `capacitor.config.ts` (ya configurado con tu color naranja):

```typescript
SplashScreen: {
  launchShowDuration: 2000,
  backgroundColor: '#FF6B35', // Cambia este color
  showSpinner: false
}
```

---

## 🔥 Siguiente Nivel: Monetización

Cuando estés listo para monetizar, instala:

```bash
# AdMob (anuncios)
npm install @capacitor-community/admob
npx cap sync

# In-App Purchases (compras)
npm install @capacitor/in-app-purchases
npx cap sync
```

Documentación completa en: `paraelBlog/capacitor-tutorial.md`

---

## ⚠️ Troubleshooting Común

### Error: "SDK not found"

Asegúrate de tener Android SDK instalado. Desde Android Studio:
**Tools → SDK Manager** → Instala Android 13.0 (Tiramisu) o superior

### Error: "Gradle build failed"

```bash
cd android
./gradlew clean
./gradlew build
```

### La app se cierra inmediatamente

Revisa logs:
```bash
npx cap run android
# O
adb logcat | grep -i capacitor
```

### Cambios no se reflejan en la app

Recuerda hacer build + sync cada vez:
```bash
npm run build && npx cap sync
```

---

## 📚 Recursos

- [Documentación oficial de Capacitor](https://capacitorjs.com/docs)
- [Tutorial completo en paraelBlog/capacitor-tutorial.md](./paraelBlog/capacitor-tutorial.md)
- [Guía Android Studio](https://developer.android.com/studio/intro)
- [Publicar en Play Store](https://capacitorjs.com/docs/android/deploying-to-google-play)

---

## 🎯 Checklist antes de publicar en Play Store

- [ ] Cambiar `applicationId` en `android/app/build.gradle`
- [ ] Incrementar `versionCode` y `versionName`
- [ ] Generar signing key
- [ ] Build AAB (no APK) para Play Store
- [ ] Crear screenshots (mínimo 2)
- [ ] Escribir descripción de la app
- [ ] Crear política de privacidad
- [ ] Configurar categoría de la app
- [ ] Definir clasificación de contenido

---

**¡Tu app está lista para ser probada!** 🎉

Ejecuta `npx cap open android` y compila tu primer APK.

¿Dudas? Revisa el tutorial completo en `paraelBlog/capacitor-tutorial.md`

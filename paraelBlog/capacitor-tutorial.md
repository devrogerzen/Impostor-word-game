# 📱 De React Web App a App Nativa con Capacitor

> Tutorial completo para convertir tu aplicación React en una app móvil nativa sin reescribir código

---

## 📋 Tabla de Contenidos

1. [¿Qué es Capacitor?](#qué-es-capacitor)
2. [¿Por qué usar Capacitor?](#por-qué-usar-capacitor)
3. [TWA vs Capacitor](#twa-vs-capacitor-comparación)
4. [Ionic vs Capacitor: Aclarando la Confusión](#️-ionic-vs-capacitor-aclarando-la-confusión)
5. [Instalación y Configuración](#instalación-y-configuración)
6. [Estructura del Proyecto](#estructura-del-proyecto)
7. [Plugins Esenciales](#plugins-esenciales)
8. [Flujo de Trabajo](#flujo-de-trabajo)
9. [Monetización](#monetización-admob-e-iap)
10. [Mejores Prácticas](#mejores-prácticas)
11. [FAQ](#preguntas-frecuentes)

---

## ⚡ ¿Qué es Capacitor?

**Capacitor** es un runtime que convierte tu aplicación web (React, Vue, Angular) en una aplicación nativa para iOS y Android, manteniendo una única base de código JavaScript/TypeScript.

### Analogía Simple

```
Tu Web App React  =  Motor del auto
Capacitor         =  Carrocería que lo convierte en vehículo completo
Plugins           =  Accesorios (GPS, radio, etc.)
```

### Cómo Funciona

```
┌──────────────────────────┐
│   Tu App React/Vite      │ ← Tu código actual (sin cambios)
│   HTML + CSS + JS/TS     │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│   Capacitor Runtime      │ ← WebView + Puente Nativo
│   API Bridge + Plugins   │
└────────────┬─────────────┘
             │
       ┌─────┴─────┐
       ▼           ▼
  ┌─────────┐ ┌─────────┐
  │ Android │ │   iOS   │  ← Apps nativas finales
  │   APK   │ │   IPA   │
  └─────────┘ └─────────┘
```

---

## 🎯 ¿Por qué usar Capacitor?

### ✅ Ventajas Principales

| Ventaja | Descripción |
|---------|-------------|
| **Un código, múltiples plataformas** | Escribe una vez, despliega en Web, Android e iOS |
| **Mantén tu stack** | Sigue usando React, tu CSS, tus librerías favoritas |
| **APIs nativas** | Acceso completo a funcionalidades del dispositivo |
| **Plugins oficiales** | Admob, IAP, Haptics, Camera, y más |
| **Actualizaciones fáciles** | Modifica tu React → Build → Sync → Listo |
| **Performance** | WebView optimizado con aceleración de hardware |
| **Comunidad activa** | Mantenido por Ionic, gran ecosistema |

### 🎮 Para Aplicaciones de Juegos/Social

- **Vibración/Haptics**: Feedback táctil en botones y eventos
- **AdMob**: Monetización con anuncios nativos
- **In-App Purchases**: Compras dentro de la app
- **Share API**: Compartir resultados en redes sociales
- **Local Storage**: Guardar estadísticas y progreso
- **Push Notifications**: Notificar a jugadores sobre eventos

---

## 🔄 TWA vs Capacitor: Comparación

| Característica | TWA (Trusted Web Activity) | Capacitor |
|----------------|---------------------------|-----------|
| **Complejidad inicial** | ⭐ Muy simple | ⭐⭐ Media |
| **Control sobre la app** | ⭐⭐ Limitado | ⭐⭐⭐⭐⭐ Total |
| **AdMob nativo** | ⚠️ Complicado, requiere workarounds | ✅ Plugin oficial, fácil |
| **In-App Purchases** | ⚠️ Limitado, no recomendado | ✅ Soporte completo |
| **APIs nativas** | ❌ Solo Web APIs | ✅ Acceso completo |
| **Vibración/Haptics** | ⚠️ API web básica | ✅ Haptics nativos |
| **Splash Screen** | ⚠️ Básico | ✅ Totalmente personalizable |
| **Icono de app** | ✅ Sí | ✅ Sí |
| **Tamaño APK** | ~1-2 MB | ~5-10 MB |
| **Performance** | ⭐⭐⭐⭐ Bueno | ⭐⭐⭐⭐ Bueno |
| **Actualizaciones** | Automáticas (PWA) | Manual (Play Store) |
| **Recomendado para** | Apps simples sin monetización | Apps con monetización/features nativas |

### 🎯 Veredicto

- **Usa TWA si**: Solo quieres presencia en Play Store, no monetizas, app muy simple
- **Usa Capacitor si**: Planeas monetizar, quieres features nativas, escalar la app

---

## ⚠️ Ionic vs Capacitor: Aclarando la Confusión

**Pregunta común**: ¿Necesito instalar Ionic para usar Capacitor?

**Respuesta corta**: **NO**. Son cosas diferentes.

### ¿Qué es cada uno?

```
┌─────────────────────────────────────────┐
│            IONIC                        │
│  Framework de Componentes UI (OPCIONAL) │
├─────────────────────────────────────────┤
│  - Librería de componentes pre-diseñados│
│  - IonButton, IonCard, IonModal, etc.   │
│  - Sistema de diseño completo           │
│  - Útil si empiezas de cero             │
│  - NO necesario si ya tienes tu UI      │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│          CAPACITOR                      │
│  Runtime Nativo (NECESARIO)             │
├─────────────────────────────────────────┤
│  - Convierte web app → app nativa       │
│  - Provee acceso a APIs del dispositivo │
│  - Funciona INDEPENDIENTE de Ionic      │
│  - Lo necesitas para Play Store/App St  │
│  - Creado por el equipo de Ionic        │
└─────────────────────────────────────────┘
```

### Comparación Práctica

| Aspecto | Solo Capacitor (✅ Recomendado) | Ionic + Capacitor |
|---------|--------------------------------|-------------------|
| **Tu UI actual** | ✅ La mantienes completa | ⚠️ Tendrías que reescribir |
| **Styled Components** | ✅ Funciona normal | ⚠️ Conflictos posibles |
| **Framer Motion** | ✅ Funciona normal | ⚠️ Conflictos posibles |
| **Tu diseño custom** | ✅ 100% intacto | ❌ Pierdes personalización |
| **Tamaño del bundle** | ~200KB extra | ~700KB extra |
| **Curva de aprendizaje** | ⭐ Mínima | ⭐⭐⭐ Alta |
| **Mejor para** | Proyectos React existentes | Proyectos nuevos desde cero |

### 🎯 ¿Qué necesitas realmente?

#### ✅ SI tienes un proyecto React existente (tu caso):

```bash
# SOLO instala Capacitor
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android

# NO instales:
# ❌ npm install @ionic/react (innecesario)
# ❌ npm install @ionic/react-router (innecesario)
```

#### ⚠️ SI estuvieras empezando de cero:

```bash
# Podrías considerar Ionic para componentes pre-hechos
npm install @ionic/react @ionic/react-router
npm install @capacitor/core @capacitor/cli
```

### 📋 Checklist: ¿Qué instalar?

**Para convertir tu app React existente a móvil:**

✅ **SÍ necesitas:**
- `@capacitor/core` - Runtime base de Capacitor
- `@capacitor/cli` - Herramientas de línea de comandos
- `@capacitor/android` - Soporte para Android
- `@capacitor/ios` - Soporte para iOS (opcional, si tienes Mac)
- Plugins específicos según necesites:
  - `@capacitor/haptics` - Vibración
  - `@capacitor/status-bar` - Barra de estado
  - `@capacitor-community/admob` - Anuncios
  - etc.

❌ **NO necesitas:**
- `@ionic/react` - Framework de componentes UI
- `@ionic/react-router` - Router de Ionic
- `@ionic/cli` - CLI de Ionic (diferente al de Capacitor)

### 🚫 Lo que NO debes hacer

❌ Reescribir tus componentes a Ionic:
```typescript
// ❌ NO HAGAS ESTO si ya tienes componentes
import { IonButton, IonCard } from '@ionic/react';

function MyComponent() {
  return <IonButton>Click</IonButton>;
}
```

✅ Mantén tus componentes actuales:
```typescript
// ✅ SIGUE HACIENDO ESTO
import Button from './components/common/Button';

function MyComponent() {
  return <Button>Click</Button>;
}
```

### 📦 Ejemplo: Tu package.json

```json
{
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "styled-components": "^6.1.19",
    "framer-motion": "^12.23.26",

    // ✅ AGREGA SOLO ESTO:
    "@capacitor/core": "^6.0.0",
    "@capacitor/android": "^6.0.0",
    "@capacitor/haptics": "^6.0.0",
    "@capacitor/status-bar": "^6.0.0",
    "@capacitor-community/admob": "^6.0.0"

    // ❌ NO agregues @ionic/react
  }
}
```

---

## 🛠️ Instalación y Configuración

### Prerequisitos

```bash
# Necesitas:
- Node.js (v16+)
- npm o yarn
- Android Studio (para builds Android)
- Xcode (para iOS, solo en Mac)
```

### Paso 1: Instalar Capacitor

```bash
# En la raíz de tu proyecto React
npm install @capacitor/core @capacitor/cli
```

### Paso 2: Inicializar Capacitor

```bash
npx cap init
```

Te preguntará:

```
? App name: El Impostor
? App Package ID: com.tuempresa.elimpostor
? What is the web asset directory: dist
```

> **📝 Nota**: El Package ID debe ser único (formato: com.empresa.app). Úsalo para Play Store.

### Paso 3: Agregar Plataformas

```bash
# Android
npm install @capacitor/android
npx cap add android

# iOS (solo si tienes Mac)
npm install @capacitor/ios
npx cap add ios
```

### Paso 4: Configurar Capacitor

Edita `capacitor.config.ts`:

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.tuempresa.elimpostor',
  appName: 'El Impostor',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#FF6B35',
      showSpinner: false
    }
  }
};

export default config;
```

### Paso 5: Build Inicial

```bash
# Build de tu app React
npm run build

# Sincronizar con plataformas nativas
npx cap sync
```

---

## 📁 Estructura del Proyecto

Después de agregar Capacitor, tu proyecto tendrá:

```
tu-proyecto/
├── src/                    ← Tu código React (SIN CAMBIOS)
│   ├── components/
│   ├── hooks/
│   └── App.tsx
│
├── dist/                   ← Build de Vite/CRA
│   ├── index.html
│   └── assets/
│
├── android/                ← Proyecto Android nativo (generado)
│   ├── app/
│   │   ├── src/
│   │   │   └── main/
│   │   │       ├── AndroidManifest.xml
│   │   │       └── res/
│   │   │           └── values/
│   │   │               └── strings.xml
│   │   └── build.gradle
│   └── build/
│       └── outputs/
│           └── apk/        ← Tu APK final aquí
│
├── ios/                    ← Proyecto iOS (si agregaste)
│   └── App/
│
├── capacitor.config.ts     ← Configuración de Capacitor
├── package.json
└── vite.config.ts
```

### 🔍 Carpetas Importantes

- **`android/app/src/main/res/`**: Iconos, splash screens, recursos
- **`android/app/src/main/AndroidManifest.xml`**: Permisos y configuración
- **`android/app/build.gradle`**: Versión de app, dependencias

---

## 🔌 Plugins Esenciales

### 1. Core Plugins (Oficiales de Capacitor)

#### App

```bash
npm install @capacitor/app
```

```typescript
import { App } from '@capacitor/app';

// Detectar cuando la app pasa a background
App.addListener('appStateChange', ({ isActive }) => {
  console.log('App is active:', isActive);
});

// Manejar deep links
App.addListener('appUrlOpen', (data) => {
  console.log('App opened with URL:', data.url);
});
```

#### Haptics (Vibración)

```bash
npm install @capacitor/haptics
```

```typescript
import { Haptics, ImpactStyle } from '@capacitor/haptics';

// Vibración al tocar botón
const handleButtonClick = async () => {
  await Haptics.impact({ style: ImpactStyle.Medium });
  // Tu lógica...
};

// Notificación de éxito
await Haptics.notification({ type: NotificationType.Success });
```

#### Status Bar

```bash
npm install @capacitor/status-bar
```

```typescript
import { StatusBar, Style } from '@capacitor/status-bar';

// Configurar color
await StatusBar.setBackgroundColor({ color: '#FF6B35' });
await StatusBar.setStyle({ style: Style.Dark });
```

#### Splash Screen

```bash
npm install @capacitor/splash-screen
```

```typescript
import { SplashScreen } from '@capacitor/splash-screen';

// Ocultar splash después de cargar
SplashScreen.hide();
```

#### Share (Compartir)

```bash
npm install @capacitor/share
```

```typescript
import { Share } from '@capacitor/share';

// Compartir resultados del juego
await Share.share({
  title: '¡Gané en El Impostor!',
  text: 'Descubrí a todos los impostores. ¿Puedes tú?',
  url: 'https://tuapp.com',
  dialogTitle: 'Compartir con amigos'
});
```

### 2. Community Plugins (Monetización)

#### AdMob

```bash
npm install @capacitor-community/admob
npx cap sync
```

```typescript
import { AdMob, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';

// Inicializar AdMob
await AdMob.initialize({
  requestTrackingAuthorization: true,
  initializeForTesting: true // false en producción
});

// Banner Ad
await AdMob.showBanner({
  adId: 'ca-app-pub-XXXXXX/XXXXXX', // Tu Ad Unit ID
  adSize: BannerAdSize.ADAPTIVE_BANNER,
  position: BannerAdPosition.BOTTOM_CENTER,
  margin: 0
});

// Interstitial Ad (entre partidas)
await AdMob.prepareInterstitial({
  adId: 'ca-app-pub-XXXXXX/XXXXXX'
});

await AdMob.showInterstitial();

// Rewarded Ad (ver video = premio)
await AdMob.prepareRewardVideoAd({
  adId: 'ca-app-pub-XXXXXX/XXXXXX'
});

await AdMob.showRewardVideoAd();
```

#### In-App Purchases

```bash
npm install @capacitor/in-app-purchases
npx cap sync
```

```typescript
import { InAppPurchases } from '@capacitor/in-app-purchases';

// Configurar productos
const products = await InAppPurchases.getProducts({
  productIds: ['remove_ads', 'premium_bundle']
});

// Comprar producto
const result = await InAppPurchases.purchaseProduct({
  productId: 'remove_ads'
});

if (result.status === 'PURCHASED') {
  // Desbloquear contenido
  localStorage.setItem('premium', 'true');
}
```

### 3. Detectar Plataforma

```typescript
import { Capacitor } from '@capacitor/core';

// Verificar si es nativa o web
if (Capacitor.isNativePlatform()) {
  // Código solo para app nativa
  await Haptics.impact({ style: ImpactStyle.Heavy });
} else {
  // Código para web
  console.log('Running on web browser');
}

// Detectar plataforma específica
const platform = Capacitor.getPlatform(); // 'ios', 'android', 'web'

if (platform === 'android') {
  // Código específico para Android
}
```

---

## 🔄 Flujo de Trabajo

### Desarrollo Diario

```bash
# 1. Desarrollo normal en React
npm run dev
# → localhost:5173 (tu app web)

# 2. Haces cambios en src/...
# 3. Guardas archivos
# → Hot reload automático como siempre
```

### Build para Android

```bash
# 1. Build de producción
npm run build

# 2. Sincronizar cambios con Android
npx cap sync

# 3. Abrir Android Studio
npx cap open android

# 4. En Android Studio:
# - Build → Build Bundle(s) / APK(s) → Build APK(s)
# - O conecta tu celular y dale Run
```

### Actualizar Después de Cambios

```bash
# Un solo comando para todo:
npm run build && npx cap sync

# Luego recompila en Android Studio o:
npx cap run android
```

### Testing en Dispositivo Real

```bash
# Opción 1: Desde Android Studio
# - Conecta tu celular por USB
# - Habilita "Depuración USB" en el celular
# - Dale "Run" (▶️) en Android Studio

# Opción 2: Desde CLI
npx cap run android --target=device-id
```

---

## 💰 Monetización: AdMob e IAP

### Estrategia Freemium Recomendada

```typescript
// src/services/monetization/PremiumManager.ts
import { Capacitor } from '@capacitor/core';
import { InAppPurchases } from '@capacitor/in-app-purchases';
import { AdMob } from '@capacitor-community/admob';

export class PremiumManager {
  private isPremium: boolean = false;

  constructor() {
    this.isPremium = localStorage.getItem('premium') === 'true';
  }

  async checkPremiumStatus(): Promise<boolean> {
    if (!Capacitor.isNativePlatform()) return false;

    // Verificar si compró "remove_ads"
    const purchases = await InAppPurchases.restorePurchases();
    this.isPremium = purchases.some(p => p.productId === 'remove_ads');

    if (this.isPremium) {
      localStorage.setItem('premium', 'true');
    }

    return this.isPremium;
  }

  async purchasePremium(): Promise<boolean> {
    try {
      const result = await InAppPurchases.purchaseProduct({
        productId: 'remove_ads'
      });

      if (result.status === 'PURCHASED') {
        this.isPremium = true;
        localStorage.setItem('premium', 'true');
        return true;
      }

      return false;
    } catch (error) {
      console.error('Purchase failed:', error);
      return false;
    }
  }

  shouldShowAd(): boolean {
    return !this.isPremium && Capacitor.isNativePlatform();
  }
}
```

### Mostrar Ads Estratégicamente

```typescript
// src/hooks/useAdManager.ts
import { useEffect } from 'react';
import { AdMob } from '@capacitor-community/admob';
import { PremiumManager } from '../services/monetization/PremiumManager';

export const useAdManager = (gameCount: number, premiumManager: PremiumManager) => {
  useEffect(() => {
    // Mostrar interstitial cada 3 partidas
    if (gameCount > 0 && gameCount % 3 === 0 && premiumManager.shouldShowAd()) {
      showInterstitialAd();
    }
  }, [gameCount]);

  const showInterstitialAd = async () => {
    try {
      await AdMob.prepareInterstitial({
        adId: 'ca-app-pub-XXXXXX/XXXXXX'
      });
      await AdMob.showInterstitial();
    } catch (error) {
      console.error('Failed to show ad:', error);
    }
  };
};
```

### Productos IAP Sugeridos

```typescript
// Configurar en Google Play Console
const IAP_PRODUCTS = {
  REMOVE_ADS: {
    id: 'remove_ads',
    price: '$0.99',
    description: 'Elimina todos los anuncios para siempre'
  },
  PREMIUM_CATEGORIES: {
    id: 'premium_categories',
    price: '$1.49',
    description: 'Desbloquea 3 categorías premium'
  },
  FULL_UNLOCK: {
    id: 'full_unlock',
    price: '$2.99',
    description: 'Todo desbloqueado + futuras actualizaciones'
  }
};
```

---

## 🎨 Mejores Prácticas

### 1. Optimiza el Tamaño del APK

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true // Elimina console.logs en producción
      }
    }
  }
});
```

### 2. Maneja el Lifecycle de la App

```typescript
// src/hooks/useAppLifecycle.ts
import { useEffect } from 'react';
import { App } from '@capacitor/app';

export const useAppLifecycle = (onBackground: () => void, onForeground: () => void) => {
  useEffect(() => {
    const listener = App.addListener('appStateChange', ({ isActive }) => {
      if (isActive) {
        onForeground();
      } else {
        onBackground();
      }
    });

    return () => {
      listener.remove();
    };
  }, []);
};

// Uso:
useAppLifecycle(
  () => {
    // Pausar música, guardar estado
    console.log('App went to background');
  },
  () => {
    // Reanudar, refrescar datos
    console.log('App came to foreground');
  }
);
```

### 3. Configura Permisos Correctamente

```xml
<!-- android/app/src/main/AndroidManifest.xml -->
<manifest>
  <!-- Internet para AdMob -->
  <uses-permission android:name="android.permission.INTERNET" />

  <!-- Vibración para Haptics -->
  <uses-permission android:name="android.permission.VIBRATE" />

  <!-- Billing para IAP -->
  <uses-permission android:name="com.android.vending.BILLING" />
</manifest>
```

### 4. Testing Pre-Lanzamiento

```typescript
// src/utils/testing.ts
export const isTestEnvironment = () => {
  const BUILD_TYPE = 'debug'; // Cambiar a 'release' en producción
  return BUILD_TYPE === 'debug';
};

// Usar en AdMob
AdMob.initialize({
  initializeForTesting: isTestEnvironment(),
  testDeviceIds: isTestEnvironment() ? ['YOUR_TEST_DEVICE_ID'] : []
});
```

### 5. Versionado Semántico

```gradle
// android/app/build.gradle
android {
    defaultConfig {
        versionCode 1        // Incrementa en cada build
        versionName "1.0.0"  // Versión visible (Major.Minor.Patch)
    }
}
```

---

## ❓ Preguntas Frecuentes

### ¿Necesito reescribir mi código React?

**No.** Tu código React se mantiene 100% igual. Solo agregas condicionales para features nativas opcionales.

### ¿Puedo seguir usando mis librerías favoritas?

**Sí.** Framer Motion, Styled Components, React Router, Redux, etc. funcionan perfectamente.

### ¿Cómo actualizo mi app después de publicarla?

1. Haces cambios en `src/`
2. `npm run build && npx cap sync`
3. Incrementas `versionCode` en `build.gradle`
4. Build nuevo APK/AAB
5. Lo subes a Google Play Console

### ¿Capacitor funciona con Vite?

**Sí.** Funciona con Vite, Create React App, Next.js (exportado), etc. Solo necesitas un build estático.

### ¿Cuánto pesa la app final?

- **APK básico**: ~5-10 MB
- **Con AdMob**: ~8-12 MB
- **Con muchas imágenes**: Depende de tus assets

### ¿Es más lento que una app nativa?

Para juegos simples y apps sociales: **No notarás diferencia**. El WebView moderno es muy rápido. No recomendado para juegos 3D intensivos.

### ¿Puedo usar TypeScript?

**Sí.** Capacitor soporta TypeScript nativamente. Todos los plugins tienen tipos.

### ¿Cómo debuggeo en el celular?

```bash
# Android
chrome://inspect

# Conecta tu celular
# Verás tu app en la lista
# Click "inspect" → DevTools completo
```

---

## 🔗 Recursos Adicionales

### Documentación Oficial

- [Capacitor Docs](https://capacitorjs.com/docs)
- [Capacitor Plugins](https://capacitorjs.com/docs/plugins)
- [AdMob Plugin](https://github.com/capacitor-community/admob)
- [React + Capacitor Guide](https://capacitorjs.com/docs/guides/react)

### Tools

- [Capacitor Assets Generator](https://github.com/ionic-team/capacitor-assets) - Genera iconos y splash screens
- [Capacitor Configure](https://github.com/ionic-team/capacitor-configure) - Configuración automatizada

### Comunidad

- [Capacitor Discord](https://discord.gg/capacitor)
- [Ionic Forum](https://forum.ionicframework.com/)
- [Stack Overflow - Capacitor Tag](https://stackoverflow.com/questions/tagged/capacitor)

---

## 🎯 Checklist: Antes de Publicar

- [ ] Cambiar `initializeForTesting: false` en AdMob
- [ ] Incrementar `versionCode` y `versionName`
- [ ] Generar iconos y splash screens para todas las resoluciones
- [ ] Configurar signing key para release build
- [ ] Probar en múltiples dispositivos Android
- [ ] Crear política de privacidad (requerido por Play Store)
- [ ] Configurar Google Play Console con screenshots y descripción
- [ ] Probar flujo de compras IAP en producción
- [ ] Revisar permisos en AndroidManifest.xml
- [ ] Build AAB (Android App Bundle) para Play Store

```bash
# Build AAB en Android Studio:
# Build → Generate Signed Bundle / APK
# → Android App Bundle
# → Release (con tu keystore)
```

---

## 🚀 Próximos Pasos

1. **Instala Capacitor** en tu proyecto actual
2. **Agrega Android Studio** si no lo tienes
3. **Configura AdMob** en [Google AdMob Console](https://admob.google.com/)
4. **Implementa 1-2 plugins** básicos (Haptics, StatusBar)
5. **Genera tu primer APK** de prueba
6. **Prueba en tu celular** físico
7. **Iteración y mejoras** basadas en feedback

---

**¿Listo para convertir tu web app en una app móvil completa?** 🎉

Con Capacitor, mantén tu stack React favorito y lleva tu proyecto al siguiente nivel con monetización nativa y features móviles profesionales.

---

*Tutorial creado para desarrolladores React que quieren escalar a móvil sin aprender desarrollo nativo.*

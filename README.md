# 🎭 El Impostor - React + TypeScript

Juego de deducción social donde los jugadores deben identificar al impostor basándose en pistas sobre palabras secretas. Desarrollado con React, TypeScript, Framer Motion y Styled Components.

## 🎮 Características

### Sistema de Impostores Escalable
El juego ajusta automáticamente el número de impostores según la cantidad de jugadores:
- **3-4 jugadores**: 1 impostor
- **5-6 jugadores**: 2 impostores
- **7-8 jugadores**: 2 impostores
- **9-10 jugadores**: 3 impostores

### Indicadores de Rol Explícitos
- **Impostores**: Reciben un badge rojo con 🎭 "¡ERES EL IMPOSTOR!" y su palabra aparece en rojo
- **Jugadores Normales**: Reciben un badge verde con ✅ "ERES UN JUGADOR NORMAL" y su palabra aparece en verde
- Cada jugador conoce su rol desde el momento en que ve su palabra

### Aleatoriedad Criptográfica
- Selección de impostores usando `window.crypto.getRandomValues()` para verdadera aleatoriedad
- Selección de palabras con algoritmo criptográficamente seguro
- Sin patrones predecibles ni sesgos en la distribución

### 11 Categorías Temáticas
- 🐾 Animales
- 🍕 Comida
- 👔 Profesiones
- ⚽ Deportes
- 🏛️ Lugares
- 🔧 Objetos
- 🚗 Transporte
- 💻 Tecnología
- 🎵 Música
- 🎬 Películas
- 🐉 Dragon Ball (30 pares de palabras temáticas)

### Diseño Arcade Moderno
- Colores sólidos vibrantes sin gradientes
- Botones con efectos 3D usando box-shadow
- Animaciones fluidas con Framer Motion
- Fondo parallax interactivo con movimiento del mouse
- Responsive design para móviles y desktop

## 🎯 Mecánicas de Juego

### Fase de Distribución
1. Cada jugador ve su palabra de forma individual y privada
2. Se indica claramente si es impostor o jugador normal
3. Los impostores reciben una palabra diferente a los jugadores normales

### Fase de Juego
1. Cada jugador da una pista sobre su palabra (sin decirla directamente)
2. Todos escuchan las pistas y tratan de identificar quién es el impostor

### Fase de Votación
1. Los jugadores votan por quien creen que es el impostor
2. Si votan correctamente:
   - **Un impostor eliminado con más restantes**: El juego continúa
   - **Todos los impostores eliminados**: Los jugadores ganan
3. Si votan incorrectamente: Los impostores tienen una última oportunidad

### Última Oportunidad del Impostor
Si los jugadores eliminan a un inocente, los impostores pueden intentar adivinar la palabra correcta:
- **Adivinan correctamente**: Los impostores ganan
- **Fallan**: Los jugadores ganan

## 🛠️ Stack Tecnológico

- **React 18**: Framework de UI
- **TypeScript**: Type safety y mejor developer experience
- **Vite**: Build tool ultra-rápido
- **Framer Motion**: Animaciones y transiciones fluidas
- **Styled Components**: CSS-in-JS con theming
- **React Icons**: Iconos de alta calidad
- **Web Crypto API**: Aleatoriedad criptográficamente segura

## 🚀 Instalación y Uso

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build para producción
npm run build

# Preview de producción
npm run preview
```

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── common/          # Componentes reutilizables (Button, Container)
│   ├── screens/         # Pantallas del juego (Menu, Config, Game, etc.)
│   └── ParallaxBackground.tsx
├── data/
│   └── words.ts         # Base de datos de palabras por categoría
├── hooks/
│   └── useImpostorGame.ts  # Lógica principal del juego
├── styles/
│   └── theme.ts         # Tema de colores y estilos globales
├── types/
│   └── game.types.ts    # Tipos de TypeScript
└── App.tsx
```

## 🎨 Paleta de Colores

- **Primary**: #FF6B35 (Naranja energético)
- **Secondary**: #004E89 (Azul profundo)
- **Accent**: #F7B801 (Amarillo dorado)
- **Success**: #06D6A0 (Verde menta)
- **Danger**: #EF476F (Rosa fuerte)
- **Purple**: #7209B7 (Morado vibrante)

## 🔧 Implementación Técnica

### Selección Aleatoria de Impostores
```typescript
const getSecureRandomInt = (max: number): number => {
  const randomBuffer = new Uint32Array(1);
  window.crypto.getRandomValues(randomBuffer);
  return randomBuffer[0] % max;
};
```

### Sistema de Múltiples Impostores
```typescript
const selectImpostors = (numPlayers: number, count: number): number[] => {
  const indices: number[] = [];
  const available = Array.from({ length: numPlayers }, (_, i) => i);

  for (let i = 0; i < count; i++) {
    const randomIndex = getSecureRandomInt(available.length);
    indices.push(available[randomIndex]);
    available.splice(randomIndex, 1);
  }

  return indices.sort((a, b) => a - b);
};
```

## 📝 Reglas del Juego

1. **Objetivo para Jugadores Normales**: Descubrir y votar por todos los impostores
2. **Objetivo para Impostores**:
   - Pasar desapercibidos durante las pistas
   - Si son descubiertos y eliminan a un inocente, adivinar la palabra correcta
3. **Prohibido**: Decir directamente tu palabra durante las pistas
4. **Pistas**: Deben ser descriptivas pero no obvias

## 🎯 Próximas Mejoras

- [ ] Sistema de puntuación por partida
- [ ] Temporizador para las pistas
- [ ] Modo online multijugador
- [ ] Más categorías personalizables
- [ ] Historial de partidas
- [ ] Estadísticas de jugadores

## 📄 Licencia

MIT License - Siéntete libre de usar este proyecto para aprender o crear tu propia versión.

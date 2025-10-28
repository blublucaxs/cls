# 🎨 color-utils-lite

Una librería completa y ligera de TypeScript para manipulación, análisis y conversión de colores.

[![npm version](https://badge.fury.io/js/color-utils-lite.svg)](https://www.npmjs.com/package/color-utils-lite)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📦 Instalación

```bash
npm i color-utils-lite
```

## 🚀 Inicio Rápido

> author Limberg Montes Tancara
```typescript
import { 
  hexToRgb, 
  lighten, 
  generatePalette,
  checkContrast 
} from 'color-utils-lite';

// Convertir colores
const rgb = hexToRgb('#3b82f6');
// → { r: 59, g: 130, b: 246 }

// Manipular colores
const lighter = lighten('#3b82f6', 20);
// → '#6da4f9'

// Generar paletas
const palette = generatePalette('#3b82f6');
// → { base, lighter[], darker[], tints[], shades[], vibrant, muted }

// Verificar accesibilidad
const contrast = checkContrast('#3b82f6', '#ffffff');
// → { ratio: 5.89, wcagAA: true, wcagAAA: false }
```

---

## 📚 Funciones por Categoría

### 🔄 Conversiones

#### `hexToRgb(hex: string): RGB`
Convierte hexadecimal a RGB
```typescript
hexToRgb('#3b82f6')      // → { r: 59, g: 130, b: 246 }
hexToRgb('#09f')         // → { r: 0, g: 153, b: 255 }
hexToRgb('3b82f6')       // → { r: 59, g: 130, b: 246 }
```

#### `rgbToHex(rgb: RGB): string`
Convierte RGB a hexadecimal
```typescript
rgbToHex({ r: 59, g: 130, b: 246 })  // → '#3b82f6'
```

#### `hexToHsl(hex: string): HSL`
Convierte hexadecimal a HSL
```typescript
hexToHsl('#3b82f6')  // → { h: 217, s: 91, l: 60 }
```

#### `hslToHex(hsl: HSL): string`
Convierte HSL a hexadecimal
```typescript
hslToHex({ h: 217, s: 91, l: 60 })  // → '#3b82f6'
```

---

### 🎨 Manipulación Básica

#### `lighten(color: string, amount: number): string`
Aclara un color (aumenta luminosidad)
```typescript
lighten('#3b82f6', 20)  // → '#6da4f9'
lighten('#3b82f6', 50)  // → '#ffffff'
```

**Caso de uso:** Crear estados hover
```typescript
const buttonColor = '#3b82f6';
const buttonHover = lighten(buttonColor, 10);
const buttonActive = lighten(buttonColor, 5);
```

#### `darken(color: string, amount: number): string`
Oscurece un color (reduce luminosidad)
```typescript
darken('#3b82f6', 20)  // → '#0960f3'
darken('#3b82f6', 50)  // → '#000000'
```

#### `saturate(color: string, amount: number): string`
Aumenta la saturación (más vibrante)
```typescript
saturate('#3b82f6', 30)  // → '#0068ff'
```

#### `desaturate(color: string, amount: number): string`
Reduce la saturación (más apagado)
```typescript
desaturate('#3b82f6', 50)  // → '#8ca5cd'

// Caso de uso: Estados deshabilitados
const disabledColor = desaturate(lighten('#3b82f6', 20), 40);
```

---

### 🔄 Manipulación Avanzada

#### `mix(color1: string, color2: string, amount?: number): string`
Mezcla dos colores (amount: 0 = color1, 1 = color2)
```typescript
mix('#3b82f6', '#ef4444')       // → '#9563a5' (50-50)
mix('#3b82f6', '#ef4444', 0.25) // → '#6d72c5' (75% azul)
mix('#3b82f6', '#ef4444', 0.75) // → '#bd5485' (75% rojo)
```

**Caso de uso:** Transiciones suaves
```typescript
const transition = [
  mix(color1, color2, 0),
  mix(color1, color2, 0.25),
  mix(color1, color2, 0.5),
  mix(color1, color2, 0.75),
  mix(color1, color2, 1)
];
```

#### `tint(color: string, amount: number): string`
Mezcla con blanco (mantiene matiz)
```typescript
tint('#3b82f6', 20)  // → '#6297f8'
tint('#3b82f6', 80)  // → '#d8eafe'
```

#### `shade(color: string, amount: number): string`
Mezcla con negro (añade profundidad)
```typescript
shade('#3b82f6', 20)  // → '#2f68c5'
shade('#3b82f6', 80)  // → '#0c1a31'
```

#### `invert(color: string): string`
Invierte el color
```typescript
invert('#3b82f6')  // → '#c47d09'
invert('#ff0000')  // → '#00ffff'
```

#### `rotateHue(color: string, degrees: number): string`
Rota el matiz en la rueda de color
```typescript
rotateHue('#3b82f6', 30)   // → '#5c3bf6'
rotateHue('#3b82f6', 180)  // → '#f6913b' (complementario)
rotateHue('#3b82f6', -30)  // → '#3bf6d5'
```

---

### 🎡 Paletas Armónicas

#### `getComplementary(color: string): string`
Obtiene el color complementario (180°)
```typescript
getComplementary('#3b82f6')  // → '#f6913b'
```

**Caso de uso:** Contraste visual
```typescript
const primary = '#3b82f6';
const accent = getComplementary(primary);
```

#### `getAnalogous(color: string, angle?: number): string[]`
Genera colores análogos (adyacentes en la rueda)
```typescript
getAnalogous('#3b82f6')      // → ['#3b5ef6', '#3b82f6', '#3bf6a6']
getAnalogous('#3b82f6', 45)  // → ['#5c3bf6', '#3b82f6', '#3bf6d5']
```

**Caso de uso:** Paleta armoniosa
```typescript
const [secondary, base, tertiary] = getAnalogous('#3b82f6', 30);
```

#### `getTriadic(color: string): string[]`
Genera paleta triádica (120° entre colores)
```typescript
getTriadic('#3b82f6')  // → ['#3b82f6', '#f63b82', '#82f63b']
```

#### `getTetradic(color: string): string[]`
Genera paleta tetrádica (90° entre colores)
```typescript
getTetradic('#3b82f6')  // → ['#3b82f6', '#f63bf6', '#f6913b', '#3bf63b']
```

---

### 📊 Generación de Paletas

#### `generatePalette(baseColor: string, steps?: number): ColorPalette`
Genera una paleta completa con todas las variaciones
```typescript
const palette = generatePalette('#3b82f6', 5);
// {
//   base: '#3b82f6',
//   lighter: [5 tonos más claros],
//   darker: [5 tonos más oscuros],
//   tints: [5 mezclas con blanco],
//   shades: [5 mezclas con negro],
//   vibrant: '#2177ff',
//   muted: '#6b92d9'
// }
```

**Caso de uso:** Sistema de diseño
```typescript
const brand = generatePalette('#3b82f6', 3);

const theme = {
  primary: brand.base,
  primaryLight: brand.lighter[0],
  primaryDark: brand.darker[0],
  primaryMuted: brand.muted
};
```

#### `generateMonochromatic(baseColor: string, count?: number): string[]`
Genera paleta monocromática (mismo matiz, diferente luminosidad)
```typescript
generateMonochromatic('#3b82f6', 7)
// → ['#bfd6fc', '#8db9fa', '#5b9cf8', '#3b82f6', '#2c62bc', '#1d4282', '#0e2248']
```

#### `generateShades(baseColor: string): Record<number, string>`
Genera escala estilo Tailwind (50-900)
```typescript
generateShades('#3b82f6')
// {
//   50: '#eff6ff',
//   100: '#dbeafe',
//   200: '#bfdbfe',
//   300: '#93c5fd',
//   400: '#60a5fa',
//   500: '#3b82f6',  // Base
//   600: '#2563eb',
//   700: '#1d4ed8',
//   800: '#1e3a8a',
//   900: '#1e2a5a'
// }
```

**Caso de uso:** Integración con Tailwind
```typescript
const brandShades = generateShades('#3b82f6');

// tailwind.config.js
const config = {
  theme: {
    extend: {
      colors: {
        brand: brandShades
      }
    }
  }
};

// Uso: class="bg-brand-500 hover:bg-brand-600"
```

#### `generateGradient(color1: string, color2: string, steps?: number): string[]`
Genera gradiente entre dos colores
```typescript
generateGradient('#3b82f6', '#ef4444', 5)
// → ['#3b82f6', '#6d72c5', '#9f6394', '#d15463', '#ef4444']
```

**Caso de uso:** CSS gradient
```typescript
const gradient = generateGradient('#3b82f6', '#ef4444', 10);
const css = `linear-gradient(90deg, ${gradient.join(', ')})`;
```

---

### ♿ Contraste y Accesibilidad

#### `getContrastRatio(color1: string, color2: string): number`
Calcula el ratio de contraste entre dos colores
```typescript
getContrastRatio('#3b82f6', '#ffffff')  // → 5.89
getContrastRatio('#000000', '#ffffff')  // → 21 (máximo)
```

#### `checkContrast(color1: string, color2: string): ContrastResult`
Verifica cumplimiento de WCAG
```typescript
checkContrast('#3b82f6', '#ffffff')
// {
//   ratio: 5.89,
//   wcagAA: true,   // ✓ Cumple AA (4.5:1)
//   wcagAAA: false  // ✗ No cumple AAA (7:1)
// }
```

**Caso de uso:** Validación de diseño
```typescript
const bg = '#3b82f6';
const text = '#ffffff';
const result = checkContrast(bg, text);

if (!result.wcagAA) {
  console.error(`Contraste insuficiente: ${result.ratio.toFixed(2)}:1`);
}
```

#### `suggestTextColor(backgroundColor: string): string`
Sugiere blanco o negro según el fondo
```typescript
suggestTextColor('#3b82f6')  // → '#ffffff'
suggestTextColor('#f59e0b')  // → '#000000'
```

**Caso de uso:** Botones accesibles
```typescript
const buttonColor = '#3b82f6';
const textColor = suggestTextColor(buttonColor);
// Siempre tendrá buen contraste
```

#### `getReadableTextColor(bg: string, light?: string, dark?: string): string`
Elige el mejor color de texto entre opciones
```typescript
getReadableTextColor('#3b82f6')  // → '#ffffff' (elige entre blanco/negro)
getReadableTextColor('#3b82f6', '#eff6ff', '#1e3a8a')  // → '#eff6ff'
```

#### `evaluateWCAG(ratio: number): WCAGLevel`
Evalúa el nivel WCAG de un ratio
```typescript
evaluateWCAG(7.5)
// {
//   level: 'AAA',
//   normalText: true,
//   largeText: true
// }

evaluateWCAG(3.5)
// {
//   level: 'AA-large',
//   normalText: false,
//   largeText: true
// }
```

#### `autoContrast(bg: string, options: string[]): string`
Selecciona automáticamente el color con mejor contraste
```typescript
const bg = '#3b82f6';
const options = ['#ffffff', '#000000', '#ef4444', '#10b981'];
autoContrast(bg, options)  // → '#ffffff' (mejor ratio)
```

---

### 📊 Análisis de Color

#### `isLight(color: string, threshold?: number): boolean`
Detecta si un color es claro
```typescript
isLight('#ffffff')  // → true
isLight('#3b82f6')  // → false
isLight('#f59e0b')  // → true
```

**Caso de uso:** Aplicar tema
```typescript
const bgColor = '#3b82f6';
const themeClass = isLight(bgColor) ? 'theme-light' : 'theme-dark';
```

#### `isDark(color: string, threshold?: number): boolean`
Detecta si un color es oscuro
```typescript
isDark('#000000')  // → true
isDark('#3b82f6')  // → true
```

#### `getBrightness(color: string): number`
Calcula el brillo percibido (0-255)
```typescript
getBrightness('#ffffff')  // → 255
getBrightness('#3b82f6')  // → 117.65
getBrightness('#000000')  // → 0
```

**Caso de uso:** Ordenar colores
```typescript
const colors = ['#ef4444', '#3b82f6', '#10b981'];
colors.sort((a, b) => getBrightness(b) - getBrightness(a));
```

#### `isVibrant(color: string, threshold?: number): boolean`
Detecta si un color es vibrante (saturado)
```typescript
isVibrant('#ff0000')  // → true (saturación 100%)
isVibrant('#808080')  // → false (saturación 0%)
```

#### `isGrayscale(color: string, threshold?: number): boolean`
Detecta si un color es gris
```typescript
isGrayscale('#808080')  // → true
isGrayscale('#3b82f6')  // → false
```

#### `getTemperature(color: string): 'warm' | 'cool' | 'neutral'`
Detecta la temperatura del color
```typescript
getTemperature('#ff0000')  // → 'warm' (rojo)
getTemperature('#0000ff')  // → 'cool' (azul)
getTemperature('#00ff00')  // → 'neutral' (verde)
```

#### `colorDistance(color1: string, color2: string): number`
Calcula la distancia euclidiana entre colores
```typescript
colorDistance('#ff0000', '#00ff00')  // → 360.62 (muy diferentes)
colorDistance('#3b82f6', '#3b7ef0')  // → 4.47 (muy similares)
```

#### `areSimilar(color1: string, color2: string, threshold?: number): boolean`
Verifica si dos colores son similares
```typescript
areSimilar('#3b82f6', '#3b7ef0', 50)  // → true
areSimilar('#ff0000', '#00ff00', 50)  // → false
```

**Caso de uso:** Eliminar duplicados
```typescript
function removeDuplicates(colors: string[]): string[] {
  return colors.filter((color, index) => 
    !colors.slice(0, index).some(c => areSimilar(color, c, 30))
  );
}
```

---

### 🛠️ Utilidades

#### `parseColor(input: string): RGB | null`
Parsea múltiples formatos de color
```typescript
parseColor('#3b82f6')                // → { r: 59, g: 130, b: 246 }
parseColor('rgb(59, 130, 246)')      // → { r: 59, g: 130, b: 246 }
parseColor('hsl(217, 91%, 60%)')     // → { r: 59, g: 130, b: 246 }
parseColor('blue')                   // → { r: 0, g: 0, b: 255 }
parseColor('invalid')                // → null
```

**Soporta:**
- Hex: `#3b82f6`, `3b82f6`, `#09f`
- RGB: `rgb(59, 130, 246)`, `rgba(59, 130, 246, 0.8)`
- HSL: `hsl(217, 91%, 60%)`, `hsla(217, 91%, 60%, 0.5)`
- CSS: `red`, `blue`, `green`, `white`, `black`, `orange`, `purple`, `pink`, `yellow`, `cyan`, `magenta`, `gray`

#### `toCss(color: string | RGB, format?: 'hex' | 'rgb' | 'hsl'): string`
Convierte a formato CSS
```typescript
toCss('#3b82f6', 'hex')  // → '#3b82f6'
toCss('#3b82f6', 'rgb')  // → 'rgb(59, 130, 246)'
toCss('#3b82f6', 'hsl')  // → 'hsl(217, 91%, 60%)'

// También acepta RGB
toCss({ r: 59, g: 130, b: 246 }, 'rgb')  // → 'rgb(59, 130, 246)'
```

#### `randomColor(options?: ColorOptions): string`
Genera color aleatorio con restricciones opcionales
```typescript
randomColor()  // → '#a7c3e9' (cualquier color)

// Con restricciones
randomColor({
  hue: [200, 250],        // Azules (200-250°)
  saturation: [60, 100],  // Alta saturación
  lightness: [40, 70]     // Luminosidad media
})
// → '#4a7bc9' (siempre azul vibrante)
```

**Caso de uso:** Avatar colors
```typescript
function getAvatarColor(userId: string): string {
  const hash = userId.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const hue = hash % 360;
  
  return randomColor({
    hue: [hue, hue],
    saturation: [60, 80],
    lightness: [50, 70]
  });
}
```

---

## 🎯 Ejemplos de Casos de Uso

### Sistema de Diseño

```typescript
import { generateShades, getAnalogous } from 'color-utils-lite';

// Color de marca
const brandColor = '#3b82f6';

// Generar escala completa
const primary = generateShades(brandColor);

// Colores secundarios
const [, , secondary] = getAnalogous(brandColor, 45);

// Exportar
export const colors = {
  primary,
  secondary: generateShades(secondary),
  success: generateShades('#10b981'),
  warning: generateShades('#f59e0b'),
  danger: generateShades('#ef4444')
};
```

### Temas Claro/Oscuro

```typescript
import { lighten, darken, suggestTextColor } from 'color-utils-lite';

function createTheme(primary: string, mode: 'light' | 'dark') {
  if (mode === 'light') {
    return {
      bg: '#ffffff',
      surface: lighten(primary, 95),
      primary: primary,
      text: '#1f2937'
    };
  } else {
    return {
      bg: '#0f172a',
      surface: darken(primary, 70),
      primary: lighten(primary, 10),
      text: '#f1f5f9'
    };
  }
}
```

### Validación de Accesibilidad

```typescript
import { checkContrast, suggestTextColor } from 'color-utils-lite';

function validateButton(bgColor: string, textColor: string) {
  const result = checkContrast(bgColor, textColor);
  
  if (!result.wcagAA) {
    const suggested = suggestTextColor(bgColor);
    throw new Error(
      `Contraste insuficiente: ${result.ratio.toFixed(2)}:1. ` +
      `Usa ${suggested} en su lugar.`
    );
  }
  
  return true;
}
```

### Gradientes Dinámicos

```typescript
import { generateGradient, getComplementary } from 'color-utils-lite';

function createGradient(baseColor: string) {
  const endColor = getComplementary(baseColor);
  const steps = generateGradient(baseColor, endColor, 10);
  
  return `linear-gradient(135deg, ${steps.join(', ')})`;
}

// Uso
const gradient = createGradient('#3b82f6');
// → "linear-gradient(135deg, #3b82f6, ...10 pasos..., #f6913b)"
```

---

## 📘 TypeScript Types

```typescript
interface RGB {
  r: number; // 0-255
  g: number; // 0-255
  b: number; // 0-255
}

interface HSL {
  h: number; // 0-360
  s: number; // 0-100
  l: number; // 0-100
}

type HexColor = string; // '#RRGGBB'

interface ContrastResult {
  ratio: number;
  wcagAA: boolean;
  wcagAAA: boolean;
}

interface ColorPalette {
  base: HexColor;
  lighter: HexColor[];
  darker: HexColor[];
  tints: HexColor[];
  shades: HexColor[];
  vibrant: HexColor;
  muted: HexColor;
}
```

---


## 📄 Licencia

MIT © [Limberg Montes]

---

## 🔗 Links

- 📦 [NPM](https://www.npmjs.com/package/color-utils-lite)
- 🐛 [Issues](https://github.com/blublucaxs/color-utils-lite/issues)

---

**¿Te gustó? ¡Dale una ⭐ en GitHub!**
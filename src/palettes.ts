import { HexColor } from './types';
import { mix } from './advanced';
import { hexToHsl, hslToHex } from './conversions';

/**
 * Genera una paleta monocromática (variaciones del mismo tono)
 */
export function generateMonochromatic(
  baseColor: HexColor,
  count: number = 5
): HexColor[] {
  const hsl = hexToHsl(baseColor);
  const palette: HexColor[] = [];
  
  for (let i = 0; i < count; i++) {
    const lightness = 20 + (i / (count - 1)) * 60; // 20% a 80%
    palette.push(hslToHex({ ...hsl, l: Math.round(lightness) }));
  }
  
  return palette;
}

/**
 * Genera una paleta complementaria (2 colores opuestos)
 */
export function generateComplementary(baseColor: HexColor): [HexColor, HexColor] {
  const hsl = hexToHsl(baseColor);
  const complementHue = (hsl.h + 180) % 360;
  
  return [
    baseColor,
    hslToHex({ ...hsl, h: complementHue })
  ];
}

/**
 * Genera una paleta complementaria dividida (Split-complementary)
 */
export function generateSplitComplementary(
  baseColor: HexColor
): [HexColor, HexColor, HexColor] {
  const hsl = hexToHsl(baseColor);
  const complement = (hsl.h + 180) % 360;
  
  return [
    baseColor,
    hslToHex({ ...hsl, h: (complement - 30 + 360) % 360 }),
    hslToHex({ ...hsl, h: (complement + 30) % 360 })
  ];
}

/**
 * Genera una paleta tetrádica (4 colores equidistantes)
 */
export function generateTetradic(
  baseColor: HexColor
): [HexColor, HexColor, HexColor, HexColor] {
  const hsl = hexToHsl(baseColor);
  
  return [
    baseColor,
    hslToHex({ ...hsl, h: (hsl.h + 90) % 360 }),
    hslToHex({ ...hsl, h: (hsl.h + 180) % 360 }),
    hslToHex({ ...hsl, h: (hsl.h + 270) % 360 })
  ];
}

/**
 * Genera una paleta cuadrada (Square)
 */
export function generateSquare(
  baseColor: HexColor
): [HexColor, HexColor, HexColor, HexColor] {
  return generateTetradic(baseColor);
}

/**
 * Genera gradiente lineal entre dos colores
 */
export function generateGradient(
  startColor: HexColor,
  endColor: HexColor,
  steps: number = 10
): HexColor[] {
  const gradient: HexColor[] = [];
  
  for (let i = 0; i < steps; i++) {
    const amount = i / (steps - 1);
    gradient.push(mix(startColor, endColor, amount));
  }
  
  return gradient;
}

/**
 * Genera gradiente multi-color (con paradas intermedias)
 */
export function generateMultiGradient(
  colors: HexColor[],
  stepsPerSegment: number = 5
): HexColor[] {
  if (colors.length < 2) {
    throw new Error('Se requieren al menos 2 colores');
  }
  
  const gradient: HexColor[] = [];
  
  for (let i = 0; i < colors.length - 1; i++) {
    const segment = generateGradient(
      colors[i],
      colors[i + 1],
      stepsPerSegment
    );
    
    // Evitar duplicados en las uniones
    if (i > 0) segment.shift();
    gradient.push(...segment);
  }
  
  return gradient;
}

/**
 * Genera paleta de colores cálidos
 */
export function generateWarmPalette(count: number = 5): HexColor[] {
  const palette: HexColor[] = [];
  const warmHues = [0, 15, 30, 45]; // Rojos, naranjas, amarillos
  
  for (let i = 0; i < count; i++) {
    const hue = warmHues[i % warmHues.length];
    const saturation = 70 + Math.random() * 30;
    const lightness = 45 + Math.random() * 25;
    
    palette.push(hslToHex({
      h: hue,
      s: Math.round(saturation),
      l: Math.round(lightness)
    }));
  }
  
  return palette;
}

/**
 * Genera paleta de colores fríos
 */
export function generateCoolPalette(count: number = 5): HexColor[] {
  const palette: HexColor[] = [];
  const coolHues = [180, 200, 220, 240, 260]; // Azules, cianos, violetas
  
  for (let i = 0; i < count; i++) {
    const hue = coolHues[i % coolHues.length];
    const saturation = 60 + Math.random() * 30;
    const lightness = 45 + Math.random() * 25;
    
    palette.push(hslToHex({
      h: hue,
      s: Math.round(saturation),
      l: Math.round(lightness)
    }));
  }
  
  return palette;
}

/**
 * Genera paleta de colores pastel
 */
export function generatePastelPalette(count: number = 5): HexColor[] {
  const palette: HexColor[] = [];
  
  for (let i = 0; i < count; i++) {
    const hue = (i / count) * 360;
    palette.push(hslToHex({
      h: Math.round(hue),
      s: 25 + Math.random() * 25, // Baja saturación
      l: 75 + Math.random() * 15  // Alta luminosidad
    }));
  }
  
  return palette;
}

/**
 * Genera paleta de colores vibrantes
 */
export function generateVibrantPalette(count: number = 5): HexColor[] {
  const palette: HexColor[] = [];
  
  for (let i = 0; i < count; i++) {
    const hue = (i / count) * 360;
    palette.push(hslToHex({
      h: Math.round(hue),
      s: 80 + Math.random() * 20, // Alta saturación
      l: 45 + Math.random() * 20  // Luminosidad media
    }));
  }
  
  return palette;
}

/**
 * Genera paleta de tonos tierra
 */
export function generateEarthyPalette(count: number = 5): HexColor[] {
  const earthyHues = [20, 30, 40, 60]; // Marrones, ocres
  const palette: HexColor[] = [];
  
  for (let i = 0; i < count; i++) {
    const hue = earthyHues[i % earthyHues.length];
    palette.push(hslToHex({
      h: hue,
      s: 30 + Math.random() * 30,
      l: 35 + Math.random() * 25
    }));
  }
  
  return palette;
}

/**
 * Genera paleta para tema oscuro (dark mode)
 */
export function generateDarkTheme(primaryColor: HexColor): {
  background: HexColor;
  surface: HexColor;
  primary: HexColor;
  secondary: HexColor;
  text: HexColor;
  textSecondary: HexColor;
  border: HexColor;
} {
  const hsl = hexToHsl(primaryColor);
  
  return {
    background: '#121212',
    surface: '#1e1e1e',
    primary: primaryColor,
    secondary: hslToHex({ ...hsl, l: Math.max(30, hsl.l - 10) }),
    text: '#ffffff',
    textSecondary: '#b3b3b3',
    border: '#333333'
  };
}

/**
 * Genera paleta para tema claro (light mode)
 */
export function generateLightTheme(primaryColor: HexColor): {
  background: HexColor;
  surface: HexColor;
  primary: HexColor;
  secondary: HexColor;
  text: HexColor;
  textSecondary: HexColor;
  border: HexColor;
} {
  const hsl = hexToHsl(primaryColor);
  
  return {
    background: '#ffffff',
    surface: '#f5f5f5',
    primary: primaryColor,
    secondary: hslToHex({ ...hsl, l: Math.min(70, hsl.l + 10) }),
    text: '#000000',
    textSecondary: '#666666',
    border: '#e0e0e0'
  };
}

/**
 * Genera paleta de material design
 */
export function generateMaterialPalette(baseColor: HexColor): {
  50: HexColor;
  100: HexColor;
  200: HexColor;
  300: HexColor;
  400: HexColor;
  500: HexColor;
  600: HexColor;
  700: HexColor;
  800: HexColor;
  900: HexColor;
} {
  const hsl = hexToHsl(baseColor);
  
  return {
    50: hslToHex({ ...hsl, l: 95 }),
    100: hslToHex({ ...hsl, l: 90 }),
    200: hslToHex({ ...hsl, l: 80 }),
    300: hslToHex({ ...hsl, l: 70 }),
    400: hslToHex({ ...hsl, l: 60 }),
    500: baseColor,
    600: hslToHex({ ...hsl, l: 45 }),
    700: hslToHex({ ...hsl, l: 35 }),
    800: hslToHex({ ...hsl, l: 25 }),
    900: hslToHex({ ...hsl, l: 15 })
  };
}
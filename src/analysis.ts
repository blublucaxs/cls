import { HexColor, RGB } from './types';
import { hexToRgb, hexToHsl } from './conversions';

/**
 * Calcula la luminancia relativa de un color
 */
function getLuminance(rgb: RGB): number {
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(val => {
    const v = val / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Determina si un color es claro
 * @param threshold - Umbral de luminancia (por defecto 0.5)
 */
export function isLight(color: HexColor, threshold: number = 0.5): boolean {
  const rgb = hexToRgb(color);
  const luminance = getLuminance(rgb);
  return luminance > threshold;
}


export function isDark(color: HexColor, threshold: number = 0.5): boolean {
  return !isLight(color, threshold);
}


export function getBrightness(color: HexColor): number {
  const rgb = hexToRgb(color);
  return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
}

/**
 * Calcula el brillo normalizado (0-1)
 */
export function getBrightnessNormalized(color: HexColor): number {
  return getBrightness(color) / 255;
}

/**
 * Determina si un color es "vibrante" (saturado)
 */
export function isVibrant(color: HexColor, threshold: number = 50): boolean {
  const hsl = hexToHsl(color);
  return hsl.s >= threshold;
}

/**
 * Determina si un color es gris/monocromático
 */
export function isGrayscale(color: HexColor, threshold: number = 10): boolean {
  const hsl = hexToHsl(color);
  return hsl.s <= threshold;
}

/**
 * Obtiene la temperatura del color (cálido/frío)
 * @returns 'warm', 'cool' o 'neutral'
 */
export function getTemperature(color: HexColor): 'warm' | 'cool' | 'neutral' {
  const hsl = hexToHsl(color);
  const h = hsl.h;
  
  // Cálidos: rojo-amarillo (0-60°)
  if ((h >= 0 && h <= 60) || h >= 300) return 'warm';
  
  // Fríos: cian-azul (180-300°)
  if (h >= 180 && h < 300) return 'cool';
  
  // Neutrales: verde-amarillo verdoso (60-180°)
  return 'neutral';
}

/**
 * Calcula la distancia euclidiana entre dos colores en RGB
 */
export function colorDistance(color1: HexColor, color2: HexColor): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  const dr = rgb1.r - rgb2.r;
  const dg = rgb1.g - rgb2.g;
  const db = rgb1.b - rgb2.b;
  
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

/**
 * Determina si dos colores son similares
 */
export function areSimilar(color1: HexColor, color2: HexColor, threshold: number = 50): boolean {
  return colorDistance(color1, color2) <= threshold;
}
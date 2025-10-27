import { RGB, HexColor } from './types';
import { hexToRgb, rgbToHsl } from './conversions';

/**
 * Calcula el brillo percibido (0-255)
 */
export function getBrightness(color: HexColor | RGB): number {
  const rgb = typeof color === 'string' ? hexToRgb(color) : color;
  return Math.round(0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b);
}

/**
 * Determina si un color es claro
 */
export function isLight(color: HexColor | RGB): boolean {
  return getBrightness(color) > 127.5;
}

/**
 * Determina si un color es oscuro
 */
export function isDark(color: HexColor | RGB): boolean {
  return !isLight(color);
}

/**
 * Obtiene el color de texto óptimo (entre dos opciones)
 */
export function getReadableTextColor(
  bgColor: HexColor | RGB,
  lightColor: HexColor = '#ffffff',
  darkColor: HexColor = '#000000'
): HexColor {
  return isLight(bgColor) ? darkColor : lightColor;
}

/**
 * Calcula la temperatura del color (cálido/frío)
 * @returns Valor entre -1 (frío/azul) y 1 (cálido/rojo)
 */
export function getTemperature(color: HexColor | RGB): number {
  const rgb = typeof color === 'string' ? hexToRgb(color) : color;
  
  // Fórmula simplificada basada en componentes R y B
  const warmth = (rgb.r - rgb.b) / 255;
  return Math.max(-1, Math.min(1, warmth));
}

/**
 * Determina si el color es cercano al gris (desaturado)
 */
export function isGrayscale(color: HexColor | RGB, threshold: number = 10): boolean {
  const hsl = rgbToHsl(typeof color === 'string' ? hexToRgb(color) : color);
  return hsl.s < threshold;
}

/**
 * Obtiene la distancia entre dos colores (Delta E simplificado)
 */
export function getColorDistance(color1: HexColor, color2: HexColor): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  const rDiff = rgb1.r - rgb2.r;
  const gDiff = rgb1.g - rgb2.g;
  const bDiff = rgb1.b - rgb2.b;
  
  return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
}

/**
 * Encuentra el color más cercano de una paleta
 */
export function findClosestColor(targetColor: HexColor, palette: HexColor[]): HexColor {
  if (palette.length === 0) {
    throw new Error('La paleta no puede estar vacía');
  }
  
  let closestColor = palette[0];
  let minDistance = getColorDistance(targetColor, palette[0]);
  
  for (let i = 1; i < palette.length; i++) {
    const distance = getColorDistance(targetColor, palette[i]);
    if (distance < minDistance) {
      minDistance = distance;
      closestColor = palette[i];
    }
  }
  
  return closestColor;
}

/**
 * Genera un color aleatorio con restricciones opcionales
 */
export function randomColor(options?: {
  saturation?: [number, number];
  lightness?: [number, number];
  hue?: [number, number];
}): HexColor {
  const h = options?.hue
    ? Math.random() * (options.hue[1] - options.hue[0]) + options.hue[0]
    : Math.random() * 360;
  
  const s = options?.saturation
    ? Math.random() * (options.saturation[1] - options.saturation[0]) + options.saturation[0]
    : Math.random() * 100;
  
  const l = options?.lightness
    ? Math.random() * (options.lightness[1] - options.lightness[0]) + options.lightness[0]
    : Math.random() * 100;
  
  const { hslToHex } = require('./conversions');
  return hslToHex({
    h: Math.round(h),
    s: Math.round(s),
    l: Math.round(l)
  });
}
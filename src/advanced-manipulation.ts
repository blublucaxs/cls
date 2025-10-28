import { HexColor, RGB } from './types';
import { hexToRgb, rgbToHex, hexToHsl, hslToHex } from './conversions';

/**
 * Mezcla dos colores según un porcentaje
 * @param color1 - Primer color
 * @param color2 - Segundo color
 * @param amount - Cantidad de mezcla (0 = color1, 1 = color2)
 */
export function mix(color1: HexColor, color2: HexColor, amount: number = 0.5): HexColor {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  const mixed: RGB = {
    r: Math.round(rgb1.r + (rgb2.r - rgb1.r) * amount),
    g: Math.round(rgb1.g + (rgb2.g - rgb1.g) * amount),
    b: Math.round(rgb1.b + (rgb2.b - rgb1.b) * amount)
  };
  
  return rgbToHex(mixed);
}

/**
 * Invierte un color
 */
export function invert(color: HexColor): HexColor {
  const rgb = hexToRgb(color);
  
  return rgbToHex({
    r: 255 - rgb.r,
    g: 255 - rgb.g,
    b: 255 - rgb.b
  });
}

/**
 * Rota el tono (hue) del color
 * @param color - Color base
 * @param degrees - Grados a rotar (puede ser negativo)
 */
export function rotateHue(color: HexColor, degrees: number): HexColor {
  const hsl = hexToHsl(color);
  hsl.h = (hsl.h + degrees) % 360;
  if (hsl.h < 0) hsl.h += 360;
  return hslToHex(hsl);
}

/**
 * Aclara mezclando con blanco (mantiene matiz)
 */
export function tint(color: HexColor, amount: number): HexColor {
  return mix(color, '#ffffff', amount / 100);
}

/**
 * Oscurece mezclando con negro (añade profundidad)
 */
export function shade(color: HexColor, amount: number): HexColor {
  return mix(color, '#000000', amount / 100);
}

/**
 * Obtiene el color complementario (opuesto en la rueda de color)
 */
export function getComplementary(color: HexColor): HexColor {
  return rotateHue(color, 180);
}

/**
 * Genera una paleta de colores análogos
 */
export function getAnalogous(color: HexColor, angle: number = 30): HexColor[] {
  return [
    rotateHue(color, -angle),
    color,
    rotateHue(color, angle)
  ];
}

/**
 * Genera una paleta triádica
 */
export function getTriadic(color: HexColor): HexColor[] {
  return [
    color,
    rotateHue(color, 120),
    rotateHue(color, 240)
  ];
}

/**
 * Genera una paleta tetrádica (cuadrada)
 */
export function getTetradic(color: HexColor): HexColor[] {
  return [
    color,
    rotateHue(color, 90),
    rotateHue(color, 180),
    rotateHue(color, 270)
  ];
}
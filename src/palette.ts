import { HexColor } from './types';
import { lighten, darken, saturate, desaturate } from './manipulation';
import { tint, shade } from './advanced-manipulation';

export interface ColorPalette {
  base: HexColor;
  lighter: HexColor[];
  darker: HexColor[];
  tints: HexColor[];
  shades: HexColor[];
  vibrant: HexColor;
  muted: HexColor;
}

/**
 * Genera una paleta completa desde un color base
 * @param baseColor - Color base
 * @param steps - Número de variaciones (por defecto 5)
 */
export function generatePalette(baseColor: HexColor, steps: number = 5): ColorPalette {
  const lighter: HexColor[] = [];
  const darker: HexColor[] = [];
  const tints: HexColor[] = [];
  const shades: HexColor[] = [];
  
  const stepSize = 100 / (steps + 1);
  
  for (let i = 1; i <= steps; i++) {
    const amount = stepSize * i;
    lighter.push(lighten(baseColor, amount));
    darker.push(darken(baseColor, amount));
    tints.push(tint(baseColor, amount));
    shades.push(shade(baseColor, amount));
  }
  
  return {
    base: baseColor,
    lighter,
    darker,
    tints,
    shades,
    vibrant: saturate(baseColor, 20),
    muted: desaturate(baseColor, 30)
  };
}

/**
 * Genera una paleta monocromática
 */
export function generateMonochromatic(baseColor: HexColor, count: number = 5): HexColor[] {
  const palette: HexColor[] = [baseColor];
  const step = 100 / (count + 1);
  
  for (let i = 1; i <= Math.floor(count / 2); i++) {
    palette.unshift(lighten(baseColor, step * i));
  }
  
  for (let i = 1; i <= Math.ceil(count / 2); i++) {
    palette.push(darken(baseColor, step * i));
  }
  
  return palette.slice(0, count);
}

/**
 * Genera una paleta de tonos (shades) para UI
 * Útil para sistemas de diseño como Tailwind
 */
export function generateShades(baseColor: HexColor): Record<number, HexColor> {
  return {
    50: tint(baseColor, 90),
    100: tint(baseColor, 80),
    200: tint(baseColor, 60),
    300: tint(baseColor, 40),
    400: tint(baseColor, 20),
    500: baseColor,
    600: shade(baseColor, 20),
    700: shade(baseColor, 40),
    800: shade(baseColor, 60),
    900: shade(baseColor, 80)
  };
}

/**
 * Genera un gradiente entre dos colores
 */
export function generateGradient(color1: HexColor, color2: HexColor, steps: number = 5): HexColor[] {
  const gradient: HexColor[] = [];
  
  for (let i = 0; i < steps; i++) {
    const ratio = i / (steps - 1);
    const r1 = parseInt(color1.slice(1, 3), 16);
    const g1 = parseInt(color1.slice(3, 5), 16);
    const b1 = parseInt(color1.slice(5, 7), 16);
    
    const r2 = parseInt(color2.slice(1, 3), 16);
    const g2 = parseInt(color2.slice(3, 5), 16);
    const b2 = parseInt(color2.slice(5, 7), 16);
    
    const r = Math.round(r1 + (r2 - r1) * ratio);
    const g = Math.round(g1 + (g2 - g1) * ratio);
    const b = Math.round(b1 + (b2 - b1) * ratio);
    
    gradient.push(`#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`);
  }
  
  return gradient;
}
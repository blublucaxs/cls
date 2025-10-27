import { HexColor, RGB, HSL } from './types';
import { hexToRgb, rgbToHex, hexToHsl, rgbToHsl, hslToRgb, hslToHex } from './conversions';
import { getContrastRatio } from './contrast';

/**
 * Parsea un color en diferentes formatos
 * Soporta: hex, rgb(), rgba(), hsl(), hsla(), nombres CSS
 */
export function parseColor(input: string): RGB | null {
  // Limpiar espacios
  const color = input.trim().toLowerCase();
  
  // Hex
  if (/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.test(color)) {
    return hexToRgb(color.startsWith('#') ? color : `#${color}`);
  }
  
  // RGB/RGBA
  const rgbMatch = color.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[1]),
      g: parseInt(rgbMatch[2]),
      b: parseInt(rgbMatch[3])
    };
  }
  
  // HSL/HSLA
  const hslMatch = color.match(/hsla?\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%/);
  if (hslMatch) {
    const hsl: HSL = {
      h: parseInt(hslMatch[1]),
      s: parseInt(hslMatch[2]),
      l: parseInt(hslMatch[3])
    };
    // Necesitamos importar hslToRgb
    return hslToRgb(hsl); // Convertir HSL a RGB
  }
  
  // Nombres CSS básicos
  const cssColors: Record<string, string> = {
    black: '#000000', white: '#ffffff', red: '#ff0000',
    green: '#008000', blue: '#0000ff', yellow: '#ffff00',
    cyan: '#00ffff', magenta: '#ff00ff', gray: '#808080',
    orange: '#ffa500', purple: '#800080', pink: '#ffc0cb'
  };
  
  if (cssColors[color]) {
    return hexToRgb(cssColors[color]);
  }
  
  return null;
}

/**
 * Convierte un color a formato CSS
 */
export function toCss(color: HexColor | RGB, format: 'hex' | 'rgb' | 'hsl' = 'hex'): string {
  const rgb = typeof color === 'string' ? hexToRgb(color) : color;
  
  switch (format) {
    case 'rgb':
      return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    case 'hsl': {
      const hsl = rgbToHsl(rgb);
      return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    }
    case 'hex':
    default:
      return rgbToHex(rgb);
  }
}

/**
 * Genera un color aleatorio
 */
export function randomColor(options?: {
  saturation?: [number, number];
  lightness?: [number, number];
  hue?: [number, number];
}): HexColor {
  const h = options?.hue 
    ? Math.floor(Math.random() * (options.hue[1] - options.hue[0]) + options.hue[0])
    : Math.floor(Math.random() * 360);
  
  const s = options?.saturation
    ? Math.floor(Math.random() * (options.saturation[1] - options.saturation[0]) + options.saturation[0])
    : Math.floor(Math.random() * 100);
  
  const l = options?.lightness
    ? Math.floor(Math.random() * (options.lightness[1] - options.lightness[0]) + options.lightness[0])
    : Math.floor(Math.random() * 100);
  
  const hsl: HSL = { h, s, l };
  const rgb = hexToRgb(hslToHex(hsl));
  return rgbToHex(rgb);
}


/**
 * Obtiene el mejor color de texto entre opciones dadas
 */
export function getReadableTextColor(
  bgColor: HexColor,
  lightColor: HexColor = '#ffffff',
  darkColor: HexColor = '#000000'
): HexColor {
  const lightRatio = getContrastRatio(bgColor, lightColor);
  const darkRatio = getContrastRatio(bgColor, darkColor);
  
  return lightRatio > darkRatio ? lightColor : darkColor;
}

/**
 * Evalúa el nivel WCAG de un ratio de contraste
 */
export function evaluateWCAG(ratio: number): {
  level: 'AAA' | 'AA' | 'AA-large' | 'fail';
  normalText: boolean;
  largeText: boolean;
} {
  return {
    level: ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : ratio >= 3 ? 'AA-large' : 'fail',
    normalText: ratio >= 4.5,
    largeText: ratio >= 3
  };
}

/**
 * Selecciona automáticamente el color con mejor contraste
 */
export function autoContrast(bgColor: HexColor, colorOptions: HexColor[]): HexColor {
  let bestColor = colorOptions[0];
  let bestRatio = 0;
  
  for (const color of colorOptions) {
    const ratio = getContrastRatio(bgColor, color);
    if (ratio > bestRatio) {
      bestRatio = ratio;
      bestColor = color;
    }
  }
  
  return bestColor;
}
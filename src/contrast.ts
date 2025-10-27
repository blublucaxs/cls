import { RGB, HexColor, ContrastResult } from './types';
import { hexToRgb } from './conversions';

function getLuminance(rgb: RGB): number {
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(val => {
    const v = val / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function getContrastRatio(color1: HexColor | RGB, color2: HexColor | RGB): number {
  const rgb1 = typeof color1 === 'string' ? hexToRgb(color1) : color1;
  const rgb2 = typeof color2 === 'string' ? hexToRgb(color2) : color2;
  
  const lum1 = getLuminance(rgb1);
  const lum2 = getLuminance(rgb2);
  
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

export function checkContrast(color1: HexColor | RGB, color2: HexColor | RGB): ContrastResult {
  const ratio = getContrastRatio(color1, color2);
  
  return {
    ratio: Math.round(ratio * 100) / 100,
    wcagAA: ratio >= 4.5,
    wcagAAA: ratio >= 7
  };
}

export function suggestTextColor(backgroundColor: HexColor | RGB): HexColor {
  const rgb = typeof backgroundColor === 'string' ? hexToRgb(backgroundColor) : backgroundColor;
  const luminance = getLuminance(rgb);
  
  // Si el fondo es claro, devolver negro; si es oscuro, devolver blanco
  return luminance > 0.5 ? '#000000' : 'rgba(255, 255, 255, 1)';
}

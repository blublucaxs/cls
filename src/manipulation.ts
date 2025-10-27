import { HSL, HexColor } from './types';
import { hexToHsl, hslToHex } from './conversions';

export function lighten(color: HexColor, amount: number): HexColor {
  const hsl = hexToHsl(color);
  hsl.l = Math.min(100, hsl.l + amount);
  return hslToHex(hsl);
}

export function darken(color: HexColor, amount: number): HexColor {
  const hsl = hexToHsl(color);
  hsl.l = Math.max(0, hsl.l - amount);
  return hslToHex(hsl);
}

export function saturate(color: HexColor, amount: number): HexColor {
  const hsl = hexToHsl(color);
  hsl.s = Math.min(100, hsl.s + amount);
  return hslToHex(hsl);
}

export function desaturate(color: HexColor, amount: number): HexColor {
  const hsl = hexToHsl(color);
  hsl.s = Math.max(0, hsl.s - amount);
  return hslToHex(hsl);
}
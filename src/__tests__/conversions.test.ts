// src/__tests__/conversions.test.ts
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb } from '../conversions';

describe('Conversiones de color', () => {
  describe('hexToRgb', () => {
    it('debe convertir hex a RGB correctamente', () => {
      expect(hexToRgb('#ff5733')).toEqual({ r: 255, g: 87, b: 51 });
      expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
      expect(hexToRgb('#ffffff')).toEqual({ r: 255, g: 255, b: 255 });
    });

    it('debe manejar formato corto (#RGB)', () => {
      expect(hexToRgb('#f00')).toEqual({ r: 255, g: 0, b: 0 });
      expect(hexToRgb('#0f0')).toEqual({ r: 0, g: 255, b: 0 });
    });

    it('debe funcionar sin el símbolo #', () => {
      expect(hexToRgb('ff5733')).toEqual({ r: 255, g: 87, b: 51 });
    });
  });

  describe('rgbToHex', () => {
    it('debe convertir RGB a hex correctamente', () => {
      expect(rgbToHex({ r: 255, g: 87, b: 51 })).toBe('#ff5733');
      expect(rgbToHex({ r: 0, g: 0, b: 0 })).toBe('#000000');
      expect(rgbToHex({ r: 255, g: 255, b: 255 })).toBe('#ffffff');
    });
  });

  describe('rgbToHsl', () => {
    it('debe convertir RGB a HSL correctamente', () => {
      const hsl = rgbToHsl({ r: 255, g: 87, b: 51 });
      expect(hsl.h).toBeCloseTo(11, 0);
      expect(hsl.s).toBeCloseTo(100, 0);
      expect(hsl.l).toBeCloseTo(60, 0);
    });

    it('debe manejar grises (sin saturación)', () => {
      const hsl = rgbToHsl({ r: 128, g: 128, b: 128 });
      expect(hsl.s).toBe(0);
    });
  });

  describe('hslToRgb', () => {
    it('debe convertir HSL a RGB correctamente', () => {
      const rgb = hslToRgb({ h: 0, s: 100, l: 50 });
      expect(rgb.r).toBe(255);
      expect(rgb.g).toBe(0);
      expect(rgb.b).toBe(0);
    });
  });

  describe('conversiones bidireccionales', () => {
    it('hex -> rgb -> hex debe ser consistente', () => {
      const original = '#ff5733';
      const rgb = hexToRgb(original);
      const final = rgbToHex(rgb);
      expect(final).toBe(original);
    });

    it('rgb -> hsl -> rgb debe ser consistente', () => {
      const original = { r: 255, g: 87, b: 51 };
      const hsl = rgbToHsl(original);
      const final = hslToRgb(hsl);
      expect(final.r).toBeCloseTo(original.r, 0);
      expect(final.g).toBeCloseTo(original.g, 0);
      expect(final.b).toBeCloseTo(original.b, 0);
    });
  });
});



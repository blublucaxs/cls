
// src/__tests__/manipulation.test.ts
import { lighten, darken, saturate, desaturate } from '../manipulation';
import { hexToHsl } from '../conversions';

describe('Manipulación de colores', () => {
  describe('lighten', () => {
    it('debe aclarar un color', () => {
      const original = '#ff5733';
      const lightened = lighten(original, 20);
      const originalHsl = hexToHsl(original);
      const lightenedHsl = hexToHsl(lightened);
      
      expect(lightenedHsl.l).toBeGreaterThan(originalHsl.l);
    });

    it('no debe exceder 100% de luminosidad', () => {
      const lightened = lighten('#ffffff', 50);
      const hsl = hexToHsl(lightened);
      expect(hsl.l).toBeLessThanOrEqual(100);
    });
  });

  describe('darken', () => {
    it('debe oscurecer un color', () => {
      const original = '#ff5733';
      const darkened = darken(original, 20);
      const originalHsl = hexToHsl(original);
      const darkenedHsl = hexToHsl(darkened);
      
      expect(darkenedHsl.l).toBeLessThan(originalHsl.l);
    });

    it('no debe ser menor a 0% de luminosidad', () => {
      const darkened = darken('#000000', 50);
      const hsl = hexToHsl(darkened);
      expect(hsl.l).toBeGreaterThanOrEqual(0);
    });
  });

  describe('saturate', () => {
    it('debe aumentar la saturación', () => {
      const original = '#808080';
      const saturated = saturate(original, 50);
      const originalHsl = hexToHsl(original);
      const saturatedHsl = hexToHsl(saturated);
      
      expect(saturatedHsl.s).toBeGreaterThanOrEqual(originalHsl.s);
    });
  });

  describe('desaturate', () => {
    it('debe reducir la saturación', () => {
      const original = '#ff5733';
      const desaturated = desaturate(original, 50);
      const originalHsl = hexToHsl(original);
      const desaturatedHsl = hexToHsl(desaturated);
      
      expect(desaturatedHsl.s).toBeLessThan(originalHsl.s);
    });
  });
});
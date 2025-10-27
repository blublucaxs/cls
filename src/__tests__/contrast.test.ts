import { getContrastRatio, checkContrast, suggestTextColor } from '../contrast';

describe('Funciones de contraste', () => {
  describe('getContrastRatio', () => {
    it('debe calcular ratio de contraste blanco/negro', () => {
      const ratio = getContrastRatio('#ffffff', '#000000');
      expect(ratio).toBeCloseTo(21, 0);
    });

    it('debe calcular ratio para colores similares', () => {
      const ratio = getContrastRatio('#ffffff', '#fefefe');
      expect(ratio).toBeLessThan(1.1);
    });

    it('debe aceptar objetos RGB', () => {
      const ratio = getContrastRatio(
        { r: 255, g: 255, b: 255 },
        { r: 0, g: 0, b: 0 }
      );
      expect(ratio).toBeCloseTo(21, 0);
    });
  });

  describe('checkContrast', () => {
    it('debe validar WCAG AA y AAA correctamente', () => {
      const result = checkContrast('#ffffff', '#000000');
      expect(result.wcagAA).toBe(true);
      expect(result.wcagAAA).toBe(true);
      expect(result.ratio).toBeCloseTo(21, 1);
    });

    it('debe fallar WCAG para bajo contraste', () => {
      const result = checkContrast('#ffffff', '#fefefe');
      expect(result.wcagAA).toBe(false);
      expect(result.wcagAAA).toBe(false);
    });
  });

  describe('suggestTextColor', () => {
    it('debe sugerir negro para fondos claros', () => {
      expect(suggestTextColor('#ffffff')).toBe('#000000');
      expect(suggestTextColor('#ffff00')).toBe('#000000');
    });

    it('debe sugerir blanco para fondos oscuros', () => {
      expect(suggestTextColor('#000000')).toBe('#ffffff');
      expect(suggestTextColor('#0000ff')).toBe('#ffffff');
    });
  });
});

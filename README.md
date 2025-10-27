# Color Utils TS

Librería TypeScript para conversión y manipulación de colores con soporte de contraste WCAG.

## Instalación

```bash
npm install color-utils-ts
```

## Uso

```typescript
import colorUtils from 'color-utils-ts';
// o importaciones específicas:
import { hexToRgb, getContrastRatio, lighten } from 'color-utils-ts';

// Conversiones
const rgb = colorUtils.hexToRgb('#ff5733');
// { r: 255, g: 87, b: 51 }

const hex = colorUtils.rgbToHex({ r: 255, g: 87, b: 51 });
// "#ff5733"

const hsl = colorUtils.hexToHsl('#ff5733');
// { h: 11, s: 100, l: 60 }

// Contraste
const contrast = colorUtils.checkContrast('#000000', '#ffffff');
// { ratio: 21, wcagAA: true, wcagAAA: true }

const textColor = colorUtils.suggestTextColor('#ff5733');
// "#000000" o "#ffffff" según el fondo

// Manipulación
const lighter = colorUtils.lighten('#ff5733', 20);
const darker = colorUtils.darken('#ff5733', 20);
const moreSaturated = colorUtils.saturate('#ff5733', 10);
```

## API

### Conversiones
- `hexToRgb(hex: string): RGB`
- `rgbToHex(rgb: RGB): string`
- `rgbToHsl(rgb: RGB): HSL`
- `hslToRgb(hsl: HSL): RGB`
- `hexToHsl(hex: string): HSL`
- `hslToHex(hsl: HSL): string`

### Contraste
- `getContrastRatio(color1, color2): number`
- `checkContrast(color1, color2): ContrastResult`
- `suggestTextColor(backgroundColor): string`

### Manipulación
- `lighten(color: string, amount: number): string`
- `darken(color: string, amount: number): string`
- `saturate(color: string, amount: number): string`
- `desaturate(color: string, amount: number): string`

## Licencia

MIT
🎨 1. Manipulación de color avanzada

Estas amplían tus funciones de lighten, darken, etc.

✅ mix(color1, color2, amount)

Qué hace: Mezcla dos colores según un porcentaje (0–1).

Ejemplo: mix('#ff0000', '#0000ff', 0.5) → #800080

Uso: Gradientes, interpolaciones o generar paletas temáticas.

✅ invert(color)

Qué hace: Devuelve el color opuesto (#000000 → #ffffff, etc.).

Uso: Generar temas oscuro/claro automáticos.

✅ rotateHue(color, degrees)

Qué hace: Cambia el tono (HSL.h) del color.

Uso: Generar combinaciones armónicas (análogas, complementarias, triádicas).

✅ tint(color, amount) y shade(color, amount)

Tint: Mezcla con blanco (aclara con matiz).

Shade: Mezcla con negro (oscurece con profundidad).

Uso: Paletas tonales para UI (hover, border, background).

🧠 2. Análisis y utilidades de color
✅ isLight(color) / isDark(color)

Qué hace: Devuelve un booleano basado en luminancia.

Uso: Decidir color de texto o íconos automáticamente.

✅ getBrightness(color)

Qué hace: Devuelve un valor 0–255 o 0–1 según brillo.

Uso: Normalizar visualizaciones o decidir fondos.

✅ getComplementary(color)

Qué hace: Calcula el color complementario (HSL.h + 180°).

Uso: Diseño gráfico o contraste artístico.

✅ generatePalette(baseColor)

Qué hace: Devuelve un set de variantes (lighten, darken, saturate, etc.).

Uso: Temas completos o paletas dinámicas.

📏 3. Contraste y accesibilidad ampliados
✅ getReadableTextColor(bgColor, light='#fff', dark='#000')

Similar a suggestTextColor, pero elige entre dos opciones personalizadas.

Uso: UI flexible que no siempre usa blanco/negro.

✅ evaluateWCAG(ratio)

Devuelve el nivel textual (“AA normal”, “AAA large”, etc.).

Uso: Mostrar reportes de accesibilidad.

✅ autoContrast(bgColor, colorOptions)

Elige automáticamente el color que cumpla mejor contraste.

Uso: Ajuste inteligente de color en botones o dashboards.

⚙️ 4. Integración y helpers
✅ parseColor(input)

Qué hace: Acepta rgb(), hsl(), #hex, incluso nombres CSS y devuelve RGB.

Uso: Permitir entrada flexible del usuario.

✅ toCss(color, format = 'hex' | 'rgb' | 'hsl')

Devuelve una cadena CSS válida.

Uso: Integración directa con frontend.

✅ randomColor({saturation?, lightness?})

Genera colores aleatorios controlados.

Uso: Testing o generadores visuales.

🧩 5. Estructura / experiencia de uso

💡 Si piensas hacerlo reutilizable como librería, considera:

Un objeto unificado, tipo:

import { Color } from 'color-utils';

const c = Color('#3498db');
c.lighten(10).saturate(5).toHex(); // encadenable


O mantenerlo funcional puro (como ahora), pero agrupado:

import { contrast, adjust, convert } from 'color-utils';
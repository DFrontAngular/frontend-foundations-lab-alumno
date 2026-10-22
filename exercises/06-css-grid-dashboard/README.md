# 06 · Dashboard con CSS Grid

**Tiempo orientativo:** 75-90 minutos

## Objetivos

- Construir una composicion bidimensional.
- Usar tracks fluidos y `minmax`.
- Reordenar mediante layout, no mediante DOM artificial.
- Reconocer cuándo Grid expresa mejor una composición que Flexbox.

## Situación

El dashboard parte de porcentajes e `inline-block`. Las métricas dependen de que haya exactamente tres elementos y los paneles se comprimen en móvil. El DOM ya tiene el orden correcto: el trabajo consiste en componerlo sin cambiarlo.

## Tarea

1. Crea una rejilla principal con cabecera de métricas, panel de actividad y panel lateral.
2. En movil todo debe apilarse en el orden del DOM.
3. A partir de un ancho razonable, la actividad debe ocupar mas espacio que el lateral.
4. Las metricas deben usar `auto-fit` o `auto-fill` con `minmax`.
5. Evita alturas fijas, filas calculadas manualmente, `position: absolute` y cambios de orden en el DOM.
6. Usa nombres de área o líneas de Grid que permitan leer con claridad dónde queda cada panel en escritorio.

## Criterios de aceptacion

- [ ] A 320 px existe una sola columna.
- [ ] Las metricas crean tantas columnas como caben.
- [ ] La composicion de escritorio tiene dos columnas desiguales.
- [ ] No se utiliza posicionamiento absoluto.
- [ ] El contenido largo expande su panel.
- [ ] Agregar una cuarta métrica no obliga a recalcular porcentajes.

## Pistas

- Grid es apropiado cuando controlas filas y columnas a la vez.
- Las áreas con nombre mejoran la legibilidad en layouts pequeños.
- El DOM debe seguir siendo lógico sin CSS.
- Para evitar que una columna flexible fuerce el ancho, prueba `minmax(0, 2fr)` en el track principal.

## Comprobacion

Prueba la página a 320 px, 768 px y 1280 px. Desactiva Grid en DevTools: el orden de lectura debe seguir siendo métricas, actividad y próximos checkpoints.

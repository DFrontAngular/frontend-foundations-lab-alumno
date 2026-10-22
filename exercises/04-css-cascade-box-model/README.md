# 04 · Cascada y box model

**Tiempo orientativo:** 75-90 minutos

## Qué vas a aprender

- Leer el panel *Computed* para descubrir qué regla gana y por qué.
- Entender cómo `content-box`, `border-box`, ancho, padding y borde calculan el tamaño final.
- Resolver una variante visual con clases, sin subir la especificidad ni usar `!important`.
- Extraer decisiones repetidas a custom properties locales.

## Situación

El CSS base del laboratorio aplica `border-box` a todos los elementos. Sin embargo, una regla del componente lo anula y cada tarjeta mide más que su columna. En escritorio puede pasar desapercibido; a 320 px provoca un scroll horizontal real.

## Tarea

1. En DevTools, identifica la regla que anula el reset de `box-sizing` y explica el ancho calculado de una tarjeta.
2. Elimina el desbordamiento sin usar `overflow: hidden`, sin quitar el padding y sin ajustar anchos a ojo.
3. Reescribe las reglas de las tarjetas con `.plan` y el modificador `.plan--featured`; elimina selectores encadenados y `!important`.
4. Crea custom properties locales para el espaciado, el borde y el color de énfasis. Úsalas tanto en la tarjeta como en su acción.
5. Haz que la comparativa de tres planes use una cuadrícula fluida: una, dos o tres columnas según el espacio disponible.
6. Da ritmo vertical a etiqueta, título, descripción, precio y acción. El aviso debe heredar la tipografía general y mantener su color contextual.

No cambies el contenido ni la estructura HTML. Solo podrías añadir una clase que tenga significado si fuera imprescindible.

## Criterios de aceptación

- [ ] A 320 px no hay scroll horizontal y no se ha ocultado con `overflow`.
- [ ] Padding y borde forman parte del ancho de cada tarjeta.
- [ ] No hay `!important` ni selectores de componente basados en cadenas largas de ancestros.
- [ ] La variante destacada se resuelve mediante una clase modificadora.
- [ ] El espaciado y los colores repetidos usan custom properties con nombres comprensibles.
- [ ] La cuadrícula no presupone que siempre existan exactamente tres planes.
- [ ] El aviso no declara una familia tipográfica propia y conserva el color de advertencia.

## Pistas

- En *Computed > box model*, compara el ancho de contenido y el ancho ocupado.
- `box-sizing: border-box` incluye padding y borde dentro del ancho declarado.
- `repeat(auto-fit, minmax(min(100%, 16rem), 1fr))` permite que la cuadrícula se adapte sin un breakpoint ligado al número de tarjetas.
- Una clase modificadora normalmente es más mantenible que ganar una carrera de especificidad.

## Comprobación

Prueba a 320 px, 768 px y 1280 px. En cada tamaño, revisa el ancho calculado de una tarjeta y explica qué regla gana para la variante destacada.

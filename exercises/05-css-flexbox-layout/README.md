# 05 · Layout con Flexbox

**Tiempo orientativo:** 60-90 minutos

## Objetivos

- Controlar eje principal y transversal.
- Permitir wrapping sin puntos de ruptura frágiles.
- Distribuir espacio sin anchuras rígidas ni márgenes compensatorios.
- Distinguir cuándo alinear un grupo y cuándo repartir el espacio dentro de una tarjeta.

## Situación

La interfaz usa técnicas de layout anteriores a Flexbox: anchos porcentuales, `float`, márgenes para simular separaciones y un margen superior fijo para empujar las acciones. Funcionan con el contenido actual en un ancho concreto, pero fallan con filtros, textos y pantallas diferentes.

## Tarea

1. Convierte la toolbar en un layout flexible: filtros como grupo, acción de limpiar como elemento independiente.
2. Permite que los filtros salten de línea antes de desbordarse y conserva un tamaño útil para cada campo.
3. Haz que las tarjetas compartan fila y crezcan desde una base razonable, sin calcular porcentajes según el número actual de tarjetas.
4. Dentro de cada tarjeta, usa una columna flexible para que las acciones queden al final aunque las descripciones tengan distinta longitud.
5. Sustituye `float`, anchos rígidos, márgenes compensatorios y la separación fija de 80 px. Evita también alturas fijas y `position: absolute`.

## Criterios de aceptacion

- [ ] La toolbar no se desborda a 320 px.
- [ ] Las tarjetas ocupan el espacio disponible y hacen wrap.
- [ ] Las acciones quedan al final sin `position: absolute`.
- [ ] Se utiliza `gap` en lugar de margenes compensatorios.
- [ ] El orden visual coincide con el DOM.
- [ ] Añadir una cuarta tarjeta con una descripción más larga no exige cambiar ningún cálculo de layout.

## Pistas

- `flex: 1 1 16rem` puede expresar crecimiento, reduccion y base.
- Para empujar una zona dentro de una tarjeta vertical puede servir `margin-block-start: auto`.
- No conviertas todo en Flexbox: solo los grupos que lo necesitan.
- Un `gap` pertenece al contenedor que distribuye elementos, no a cada elemento hijo.

## Comprobacion

Prueba la página a 320 px, 768 px y 1280 px. Cambia temporalmente la descripción de una tarjeta por un texto más largo y comprueba que el botón sigue alineado sin valores mágicos.

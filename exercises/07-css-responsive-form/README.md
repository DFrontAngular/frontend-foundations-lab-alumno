# 07 · Responsive y estados de formulario

**Tiempo orientativo:** 75-90 minutos

## Objetivos

- Diseñar mobile-first.
- Usar escalas fluidas sin saltos innecesarios.
- Representar foco, invalidez y deshabilitado.
- Respetar preferencias de movimiento.
- Construir estados de formulario que sigan siendo comprensibles sin depender solo del color.

## Situación

El starter empieza con un ancho de escritorio fijo, anula el foco que aporta la hoja base y aplica el estado inválido desde el primer render. Debes convertirlo en una interfaz mobile-first que solo muestre error cuando la persona ya haya interactuado.

## Tarea

1. Parte de una columna y crea dos columnas solo cuando exista espacio.
2. Haz que tipografia y espaciado crezcan con limites mediante `clamp`.
3. Estiliza `:focus-visible`, `:invalid:not(:placeholder-shown)` y `:disabled`. Restituye un foco inequívoco; no basta con cambiar el borde.
4. Haz visible la pista de validación cuando corresponda para que el error no se comunique solo mediante color.
5. Añade una transición discreta únicamente dentro de `prefers-reduced-motion: no-preference`.
6. Asegura que el resumen y el formulario no provoquen overflow, incluidos sus campos dentro de una cuadrícula.

## Criterios de aceptacion

- [ ] Funciona a 320 px sin scroll horizontal.
- [ ] Los labels no se truncan.
- [ ] El foco es claramente visible.
- [ ] Un campo invalido no se comunica solo mediante color.
- [ ] La reduccion de movimiento elimina transiciones no esenciales.
- [ ] Un campo obligatorio vacío no se presenta como error antes de que la persona empiece a escribir.

## Pistas

- El media query debe responder al contenido, no a un dispositivo concreto.
- No ocultes el outline sin reemplazo equivalente.
- La pista ya existe en el HTML: decide cuándo debe aparecer o adquirir énfasis.
- `@media (prefers-reduced-motion: no-preference)` evita tener que deshacer la transición después.

## Comprobacion

Prueba la página a 320 px, 768 px y 1280 px. Navega con teclado, escribe un correo inválido y activa en DevTools la preferencia de reducción de movimiento.

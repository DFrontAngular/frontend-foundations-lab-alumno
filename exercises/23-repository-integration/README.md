# 23 · Integrar un ejercicio en un repositorio existente

**Tiempo orientativo:** 90-120 minutos

## Objetivos

- Orientarte en una base de código que no has creado tú.
- Detectar y respetar sus convenciones antes de editar.
- Hacer un cambio pequeño que atraviesa datos, archivos y navegación.
- Validar el resultado completo desde la raíz del repositorio.

## Contexto

El equipo ha preparado un nuevo ejercicio, pero todavía no forma parte del itinerario. Tu tarea no es resolver una interfaz aislada: debes incorporarlo al producto sin romper lo que ya existe.

El nuevo ejercicio se llamará **24 · Tarjeta de perfil accesible**. Su objetivo es construir una ficha de perfil con una jerarquía semántica, una imagen con texto alternativo adecuado y enlaces con nombres comprensibles.

## Tarea

1. Antes de cambiar nada, localiza cómo se describen los ejercicios en `site/curriculum.mjs` y compara dos carpetas existentes dentro de `exercises/`.
2. Añade una entrada para `24-html-profile-card` al catálogo. Debe tener número, módulo, duración, dificultad, formato, descripción, objetivos, criterios de aceptación y la URL de su starter.
3. Crea `exercises/24-html-profile-card/README.md` con el enunciado, los criterios y al menos dos pistas.
4. Crea `exercises/24-html-profile-card/starter/index.html`. Debe ser una base de trabajo coherente con el enunciado y usar los recursos compartidos que correspondan.
5. Si estás trabajando en la copia de mentor, añade también la solución de referencia siguiendo la estructura de `solutions/`.
6. Comprueba que la tarjeta aparece en el catálogo, que sus instrucciones cargan y que el botón abre el `index.html` del starter.

No modifiques ejercicios ya publicados ni cambies el servidor, salvo que puedas justificar que es imprescindible. Este reto valora una integración pequeña y consistente, no el número de archivos tocados.

## Criterios de aceptación

- [ ] `24-html-profile-card` aparece una sola vez en el catálogo y se puede filtrar por su módulo.
- [ ] La ficha del ejercicio muestra instrucciones, objetivos y criterios completos.
- [ ] La ruta del starter abre `exercises/24-html-profile-card/starter/index.html`.
- [ ] La estructura, los nombres y los metadatos siguen el patrón de los ejercicios vecinos.
- [ ] No se han introducido cambios ajenos al encargo.
- [ ] `npm run check` termina correctamente.

## Entrega

Incluye una nota breve en tu PR o entrega indicando:

1. Qué archivos encontraste como referencia.
2. Qué archivos añadiste o modificaste.
3. Qué comando usaste para validar el repositorio.

## Pistas

- Empieza buscando `starterUrl` y un ejercicio del módulo HTML.
- El catálogo, el README y el starter son piezas distintas: ninguna sustituye a las otras.
- Haz primero el cambio mínimo, pruébalo en el navegador y solo entonces mejora los detalles.

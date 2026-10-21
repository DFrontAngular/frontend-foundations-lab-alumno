# Frontend Foundations Lab

Repositorio formativo para construir una base real de **HTML, CSS, JavaScript, APIs del navegador, HTTP y TypeScript** antes de entrar en Angular.

No pretende enseñar cada rincón del lenguaje. Su objetivo es comprobar que una persona entiende la plataforma web y puede construir una aplicación pequeña sin depender de las abstracciones de un framework.

## Qué incluye

- Una prueba diagnóstica inicial para detectar lagunas antes de asignar el itinerario.
- 23 retos progresivos: 22 ejercicios y un capstone final, todos con starter y criterios de aceptación.
- Una aplicación final sin framework que consume una API CRUD local.
- Portal navegable con progreso guardado en `localStorage`.
- API local con paginación, búsqueda, filtros, ordenación, errores simulados y subida `multipart/form-data`.
- Pruebas automáticas para los ejercicios de lógica y para la infraestructura.
- Ejercicios TypeScript en modo `strict`.
- Rúbrica objetiva para decidir si la persona puede pasar a Angular.
- Matriz de competencias, checklist de accesibilidad y política de uso de IA.

## Requisitos

- Node.js 22 o superior.
- npm 10 o superior.
- Un navegador moderno.
- Visual Studio Code u otro editor con soporte para JavaScript y TypeScript.

## Arranque

```bash
npm install
npm run dev
```

Abre `http://localhost:4173`.

La API queda disponible bajo el mismo origen, por ejemplo:

```text
http://localhost:4173/api/products
http://localhost:4173/api/categories
http://localhost:4173/api/health
```

## Comandos

```bash
npm run dev                         # portal, ejercicios y API local
npm run list                        # lista ejercicios y comandos
npm run check                       # valida la estructura del repositorio
npm test                            # prueba API, estructura y starters
npm run verify                      # ejecuta todas las comprobaciones
npm run test:exercise -- 08         # prueba el starter del ejercicio 08
npm run test:exercise -- 12         # prueba el starter del ejercicio indicado
npm run test:exercises              # ejecuta todos los tests disponibles (08-18)
npm run typecheck:exercise -- 19     # comprueba el starter TypeScript del ejercicio 19
npm run typecheck:all                # comprueba los contratos TypeScript 19-21
```

Los comandos se ejecutan desde la raíz del repositorio, después de `npm install`. Para una práctica concreta, sustituye `12` por su número. El test debe ejecutarse después de cada cambio: `ok` significa que ese criterio pasa y `not ok` indica qué comportamiento queda por completar.

## Itinerario recomendado

1. **Diagnóstico:** prueba práctica de 90 minutos para asignar el punto de entrada.
2. **HTML y accesibilidad:** estructura, semántica, formularios y tablas.
3. **CSS:** cascada, box model, Flexbox, Grid, responsive y estados de interacción.
4. **JavaScript:** datos, funciones, módulos, reglas de negocio, errores y asincronía.
5. **Navegador y DOM:** renderizado seguro, eventos, formularios, URL y persistencia.
6. **HTTP:** `fetch`, estados de interfaz, CRUD, cancelación y `FormData`.
7. **TypeScript:** modelado de dominio, `unknown`, genéricos, utility types y uniones discriminadas.
8. **Capstone:** aplicación completa sin framework.
9. **Evaluación:** revisión guiada y decisión de entrada a Angular.

Consulta [docs/01-learning-path.md](docs/01-learning-path.md) para el recorrido detallado.

## Criterio de paso a Angular

La persona no necesita dominar internals avanzados de JavaScript. Sí debe poder:

- construir una interfaz semántica y operable con teclado;
- maquetar sin depender de un framework CSS;
- transformar datos con funciones claras y sin mutaciones accidentales;
- trabajar con DOM, eventos y formularios nativos;
- consumir una API y representar `loading`, `error`, `empty` y `success`;
- implementar operaciones CRUD básicas y gestionar errores;
- modelar datos con TypeScript estricto;
- explicar las decisiones tomadas en la aplicación final.

Los mínimos obligatorios están definidos en [docs/07-angular-entry-criteria.md](docs/07-angular-entry-criteria.md).

## Organización

```text
site/          Portal de aprendizaje.
diagnostic/    Prueba inicial con starter y enunciado.
shared/        Estilos y utilidades compartidas de los ejercicios.
server/        Servidor estático y API local, sin dependencias runtime.
exercises/     Enunciados y starters.
capstone/      Proyecto final y starter.
docs/          Material de apoyo para el itinerario.
tests/         Pruebas de infraestructura y ejercicios.
```

## Publicar en un repositorio nuevo

Después de descomprimir y comprobar el proyecto:

```bash
npm install
npm run verify
git init
git add .
git commit -m "chore: bootstrap frontend foundations lab"
git branch -M main
git remote add origin <URL_DEL_REPOSITORIO>
git push -u origin main
```

El primer `npm install` generará `package-lock.json`; conviene versionarlo para mantener instalaciones reproducibles.

## Licencia

MIT.

# 19 · Modelado de dominio

**Tiempo orientativo:** 75-90 minutos

## Objetivos

- Representar estados cerrados con uniones literales.
- Diferenciar entidad, borrador y dato externo.
- Crear type guards a partir de `unknown`.

## Tarea

1. Define `ProductStatus` con los estados ACTIVE, INACTIVE y DISCONTINUED.
2. Define `Product` con propiedades readonly donde corresponda.
3. Deriva `ProductDraft` sin id ni fecha de creacion.
4. Implementa `isProduct(value: unknown): value is Product` sin casts ciegos.
5. Implementa `formatProductStatus` de forma exhaustiva.

## Criterios de aceptacion

- [ ] `ARCHIVED` no es asignable a ProductStatus.
- [ ] Un ProductDraft no acepta id.
- [ ] El guard comprueba objeto, campos y status.
- [ ] No se usa `any`.
- [ ] Añadir un nuevo status obliga a revisar el formatter.

## Comprobar tipos

```bash
npm run typecheck:exercise -- 19
```

Para comprobar los tres ejercicios TypeScript a la vez, usa `npm run typecheck:all` desde la raiz.

El starter contiene pruebas de tipos con `@ts-expect-error`. Al principio pueden fallar porque un tipo aun acepta estados que deberia rechazar.

## Pistas

- Empieza comprobando que `value` es un objeto no nulo.
- Una funcion auxiliar `isRecord` evita repetir casts.
- Usa `never` para hacer exhaustivo un switch.

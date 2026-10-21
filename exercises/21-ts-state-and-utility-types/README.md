# 21 · Estados y utility types

**Tiempo orientativo:** 90-120 minutos

## Objetivos

- Derivar DTOs sin duplicar el dominio.
- Evitar combinaciones imposibles de flags.
- Exigir render exhaustivo.

## Tarea

1. Define `ProductCreate`, `ProductPatch` y `ProductCardView` con utility types.
2. Modela `LoadState<T>` como union discriminada.
3. Cada variante debe contener solo los datos que necesita.
4. Implementa `mapState` preservando loading/error y transformando success.
5. Implementa `stateLabel` con exhaustividad.

## Criterios de aceptacion

- [ ] No puede existir loading y data a la vez.
- [ ] Error requiere un mensaje.
- [ ] Success requiere data.
- [ ] ProductPatch no permite id ni createdAt.
- [ ] El switch utiliza `never` para detectar nuevas variantes.

## Comprobar tipos

```bash
npm run typecheck:exercise -- 21
```

Para comprobar los tres ejercicios TypeScript a la vez, usa `npm run typecheck:all` desde la raiz.

El starter contiene pruebas de tipos con `@ts-expect-error`. Al principio pueden fallar porque un tipo aun acepta estados que deberia rechazar.

## Pistas

- Los flags booleanos independientes permiten estados contradictorios.
- El discriminante suele llamarse `status` o `kind`.
- `Omit` y `Pick` deben reflejar un contrato real, no ahorrar unas lineas sin criterio.

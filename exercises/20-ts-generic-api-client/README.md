# 20 · Cliente API generico

**Tiempo orientativo:** 90-120 minutos

## Objetivos

- Usar genericos para preservar tipos, no para saltar validacion.
- Mantener `unknown` en la frontera JSON.
- Modelar errores HTTP.

## Tarea

1. Define `Parser<T>`.
2. Implementa `requestJson<T>` recibiendo un parser obligatorio.
3. No utilices `response.json() as T`.
4. Lanza `ApiContractError` cuando el parser rechace un cuerpo JSON.
5. Modela `Page<T>` como readonly.
6. Implementa `parsePage(itemParser)` que componga parsers.
7. Crea `getProducts` con el parser de producto.

## Criterios de aceptacion

- [ ] El JSON se trata como `unknown`.
- [ ] Un cuerpo invalido lanza un error de contrato.
- [ ] Un HTTP no satisfactorio lanza `ApiError` con status.
- [ ] La pagina conserva el tipo del item.
- [ ] No se usa `any`.

## Ejecutar pruebas de comportamiento

```bash
npm run test:exercise -- 20
```

Estas pruebas comprueban la frontera en ejecución; el typecheck solo confirma que el contrato está expresado correctamente.

## Comprobar tipos

```bash
npm run typecheck:exercise -- 20
```

Para comprobar los tres ejercicios TypeScript a la vez, usa `npm run typecheck:all` desde la raiz.

El starter contiene pruebas de tipos con `@ts-expect-error`. Al principio pueden fallar porque un tipo aun acepta estados que deberia rechazar.

## Pistas

- Un generico no valida en runtime.
- Los parsers son funciones normales y se pueden componer.
- Inyectar `fetcher` facilita las pruebas sin acoplar al global.

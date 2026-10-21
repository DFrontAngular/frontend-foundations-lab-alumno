# 18 · Debounce, cancelacion y subida

**Tiempo orientativo:** 120-150 minutos

## Objetivos

- Evitar carreras entre peticiones.
- Cancelar trabajo obsoleto.
- Enviar multipart sin construir el boundary manualmente.

## Tarea

1. Implementa `debounce` para retrasar la busqueda.
2. Conserva el `AbortController` activo y abortalo antes de la siguiente peticion.
3. Ignora `AbortError` como flujo esperado.
4. Muestra solo los resultados de la ultima busqueda.
5. Construye `FormData` desde el formulario de upload.
6. No establezcas manualmente `Content-Type` en la subida.

## Criterios de aceptacion

- [ ] Escribir rapidamente no muestra resultados antiguos.
- [ ] Una cancelacion no presenta un mensaje de error.
- [ ] La busqueda vacia sigue siendo valida.
- [ ] El upload envia fichero y titulo.
- [ ] Durante subida el boton queda deshabilitado.
- [ ] El resultado muestra bytes recibidos por la API.

## Pistas

- El navegador añade el boundary de multipart.
- Abortar la peticion anterior es mas robusto que comparar solo textos.
- Debounce y cancelacion resuelven problemas distintos.

## Endpoints utiles

- `GET /api/products`
- `GET /api/products?search=monitor&limit=6`
- `GET /api/products?status=500`
- `GET /api/products?delay=1500`
- `POST /api/products`
- `PATCH /api/products/:id`
- `DELETE /api/products/:id`
- `POST /api/upload`

## Autocorreccion

Desde la raiz del repositorio, ejecuta despues de cada cambio:

```bash
npm run test:exercise -- 18
```

`ok` indica que el criterio pasa; `not ok` señala el comportamiento que debes revisar.

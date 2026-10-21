# 16 · Fetch y estados de interfaz

**Tiempo orientativo:** 90-120 minutos

## Objetivos

- Interpretar correctamente respuestas HTTP.
- Modelar estados de carga, error, vacio y exito.
- Permitir recuperacion mediante reintento.

## Tarea

1. Implementa `fetchProducts(url)` comprobando `response.ok`.
2. Crea una funcion unica que renderice el estado actual.
3. Deshabilita los controles mientras carga sin bloquear el documento.
4. Diferencia respuesta vacia de error.
5. Implementa reintento conservando el ultimo escenario.

## Criterios de aceptacion

- [ ] Un 500 no intenta renderizarse como listado.
- [ ] Solo existe un estado principal visible cada vez.
- [ ] El error ofrece reintento.
- [ ] El estado vacio no se muestra durante loading.
- [ ] La respuesta JSON invalida produce un error comprensible.

## Pistas

- `fetch` solo rechaza por red o aborto; un 500 sigue resolviendo la promesa.
- Una union conceptual de estados evita flags contradictorios.
- Guarda el ultimo request para que retry sea determinista.

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
npm run test:exercise -- 16
```

`ok` indica que el criterio pasa; `not ok` señala el comportamiento que debes revisar.

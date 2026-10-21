# 17 · CRUD contra una API

**Tiempo orientativo:** 120-180 minutos

## Objetivos

- Implementar mutaciones HTTP.
- Evitar dobles envios.
- Mostrar errores 422 junto al campo correspondiente.

## Tarea

1. Carga el listado inicial.
2. Usa el mismo formulario para crear y editar.
3. En edicion envia `PATCH /api/products/:id`; en alta envia `POST /api/products`.
4. Implementa borrado tras confirmacion.
5. Procesa `error.details` de una respuesta 422.
6. Deshabilita acciones mientras su mutacion esta en curso.

## Criterios de aceptacion

- [ ] Crear añade un producto visible.
- [ ] Editar precarga el formulario y conserva el identificador.
- [ ] Cancelar edicion devuelve el formulario a modo alta.
- [ ] Borrar elimina la fila sin recargar la pagina.
- [ ] Un error de validacion no se muestra como error generico.
- [ ] El boton submit no permite doble envio.

## Pistas

- Centraliza `requestJson` para tratamiento HTTP coherente.
- La API devuelve 204 al borrar: no intentes parsear JSON.
- La delegacion de eventos simplifica las acciones de tabla.

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
npm run test:exercise -- 17
```

`ok` indica que el criterio pasa; `not ok` señala el comportamiento que debes revisar.

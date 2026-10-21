# 15 · URL, History y localStorage

**Tiempo orientativo:** 90-120 minutos

## Objetivos

- Representar filtros compartibles en query params.
- Persistir solo preferencias locales.
- Leer almacenamiento de forma defensiva.

## Tarea

1. Lee `search`, `category` y `sort` desde `location.search` al arrancar.
2. Actualiza la URL con `history.replaceState` al cambiar filtros.
3. No incluyas parametros vacios.
4. Guarda la vista preferida (`grid` o `list`) en `localStorage`.
5. Recupera storage corrupto sin romper la aplicacion.

## Criterios de aceptacion

- [ ] Copiar la URL a otra pestaña reproduce filtros y orden.
- [ ] Recargar conserva filtros y vista.
- [ ] La preferencia visual no contamina la URL.
- [ ] Restablecer filtros elimina query params.
- [ ] Un JSON invalido en storage usa el valor por defecto.

## Pistas

- La URL representa estado que conviene compartir o navegar.
- Storage representa preferencia local del navegador.
- Centraliza lectura y escritura para no mezclar formatos.

## Comprobacion manual

Utiliza DevTools para inspeccionar el DOM final, los listeners y el estado de la URL o almacenamiento cuando aplique.

## Autocorreccion

Desde la raiz del repositorio, ejecuta despues de cada cambio:

```bash
npm run test:exercise -- 15
```

`ok` indica que el criterio pasa; `not ok` señala el comportamiento que debes revisar.

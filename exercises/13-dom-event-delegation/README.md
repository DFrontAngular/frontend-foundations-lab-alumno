# 13 · Eventos y delegacion

**Tiempo orientativo:** 75-90 minutos

## Objetivos

- Comprender bubbling.
- Delegar eventos en un ancestro estable.
- Identificar acciones mediante `data-*`.

## Tarea

1. Implementa alta de tareas desde el formulario.
2. Registra un unico listener de `click` en la lista.
3. Usa `closest` para localizar botones de completar y eliminar.
4. Actualiza el estado y vuelve a renderizar.
5. Permite enviar el formulario con Enter.

## Criterios de aceptacion

- [ ] La lista mantiene un solo listener de click.
- [ ] Las tareas creadas despues funcionan sin listeners adicionales.
- [ ] Pulsar texto o icono dentro del boton activa la accion correcta.
- [ ] Los botones tienen nombre accesible.
- [ ] No se depende del texto visible para identificar la accion.

## Pistas

- El evento sube por el arbol salvo que se detenga.
- `event.target` puede ser un elemento interno; `closest` encuentra el control.
- El identificador de tarea puede viajar en `data-task-id`.

## Comprobacion manual

Utiliza DevTools para inspeccionar el DOM final, los listeners y el estado de la URL o almacenamiento cuando aplique.

## Autocorreccion

Desde la raiz del repositorio, ejecuta despues de cada cambio:

```bash
npm run test:exercise -- 13
```

`ok` indica que el criterio pasa; `not ok` señala el comportamiento que debes revisar.

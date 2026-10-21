# 14 · Formularios nativos y FormData

**Tiempo orientativo:** 90-120 minutos

## Objetivos

- Usar Constraint Validation API.
- Leer el formulario de forma declarativa.
- Asociar errores dinamicos a sus campos.

## Tarea

1. Intercepta `submit` y ejecuta `checkValidity`.
2. Recorre `form.elements` para mostrar mensajes por campo.
3. Usa `FormData` para construir el borrador.
4. Convierte explicitamente numeros y checkbox.
5. Tras exito, añade el producto, resetea y devuelve foco al nombre.

## Criterios de aceptacion

- [ ] No se consulta cada input mediante un selector individual.
- [ ] El primer campo invalido recibe foco.
- [ ] Cada error utiliza `aria-describedby` o una relacion equivalente.
- [ ] Los numeros no permanecen como strings.
- [ ] El mensaje global se actualiza con `role=status`.

## Pistas

- `invalid` no burbujea, pero puede escucharse en captura.
- `form.elements` incluye controles nombrados.
- `FormData` no incluye checkboxes desmarcados.

## Comprobacion manual

Utiliza DevTools para inspeccionar el DOM final, los listeners y el estado de la URL o almacenamiento cuando aplique.

## Autocorreccion

Desde la raiz del repositorio, ejecuta despues de cada cambio:

```bash
npm run test:exercise -- 14
```

`ok` indica que el criterio pasa; `not ok` señala el comportamiento que debes revisar.

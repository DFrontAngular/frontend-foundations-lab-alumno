# 12 · Renderizado DOM seguro

**Tiempo orientativo:** 75-90 minutos

## Objetivos

- Crear elementos y fragmentos de documento.
- Tratar datos externos como texto.
- Modelar estados vacio y con resultados.

## Tarea

1. Implementa `createProductCard(product)` con `createElement` y `textContent`.
2. Implementa `renderProducts(container, products)` reemplazando el render anterior.
3. Utiliza `DocumentFragment` para agrupar inserciones.
4. Muestra un mensaje vacio cuando no hay resultados.
5. Añade una insignia para stock bajo sin interpolar HTML.

## Criterios de aceptacion

- [ ] No se usa `innerHTML` para insertar datos.
- [ ] Un nombre con etiquetas se muestra literalmente.
- [ ] Renderizar dos veces no duplica contenido.
- [ ] El estado vacio es visible y comprensible.
- [ ] Cada tarjeta conserva una jerarquia de encabezados razonable.

## Pistas

- `replaceChildren` permite sustituir el contenido existente.
- Una funcion que crea una tarjeta puede devolver el nodo raiz.
- Los datos del usuario deben entrar por `textContent`.

## Comprobacion manual

Utiliza DevTools para inspeccionar el DOM final, los listeners y el estado de la URL o almacenamiento cuando aplique.

## Autocorreccion

Desde la raiz del repositorio, ejecuta despues de cada cambio:

```bash
npm run test:exercise -- 12
```

`ok` indica que el criterio pasa; `not ok` señala el comportamiento que debes revisar.

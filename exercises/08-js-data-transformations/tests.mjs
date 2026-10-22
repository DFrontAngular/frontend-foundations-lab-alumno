import assert from 'node:assert/strict';
import { test } from 'node:test';

const sut = await import(new URL('./starter/logic.mjs', import.meta.url));

const products = [
  { name: 'Ratón ergonómico', category: 'Periféricos', description: 'Inalámbrico', price: 40, stock: 3 },
  { name: 'Monitor', category: 'Pantallas', description: 'IPS', price: 200, stock: 2 },
  { name: 'Teclado', category: 'Periféricos', description: 'Mecánico', price: 80, stock: 4 }
];

test('normaliza espacios, mayusculas y diacriticos', () => {
  assert.equal(sut.normalizeSearchTerm('  RATÓN  '), 'raton');
});

test('filtra por cualquier campo textual y no muta', () => {
  const original = structuredClone(products);
  assert.deepEqual(sut.filterProducts(products, 'perifericos').map((item) => item.name), ['Ratón ergonómico', 'Teclado']);
  assert.deepEqual(products, original);
});

test('ordena ascendente y descendente sin mutar', () => {
  const original = [...products];
  assert.deepEqual(sut.sortProducts(products, 'price').map((item) => item.price), [40, 80, 200]);
  assert.deepEqual(sut.sortProducts(products, 'stock', 'desc').map((item) => item.stock), [4, 3, 2]);
  assert.deepEqual(products, original);
});

test('agrupa por categoria', () => {
  const groups = sut.groupProductsByCategory(products);
  assert.equal(groups['Periféricos'].length, 2);
  assert.equal(groups.Pantallas.length, 1);
});

test('resume unidades y valor del inventario', () => {
  assert.deepEqual(sut.summarizeInventory(products), {
    productCount: 3,
    totalUnits: 9,
    totalValue: 840
  });
});

test('la busqueda vacia conserva todos los productos y la agrupacion crea arrays nuevos', () => {
  const result = sut.filterProducts(products, '   ');
  const groups = sut.groupProductsByCategory(products);
  assert.notEqual(result, products);
  assert.equal(result.length, products.length);
  assert.notEqual(groups['Periféricos'], products);
});

test('rechaza un criterio de ordenacion desconocido', () => {
  assert.throws(() => sut.sortProducts(products, 'unknown'), RangeError);
});

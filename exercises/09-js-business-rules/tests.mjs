import assert from 'node:assert/strict';
import { test } from 'node:test';

const sut = await import(new URL('./starter/domain.mjs', import.meta.url));

test('calcula descuento antes de impuesto y redondea', () => {
  assert.equal(sut.calculateFinalPrice({ price: 100, discountPercent: 10, taxPercent: 21 }), 108.9);
  assert.equal(sut.calculateFinalPrice({ price: 0.1, discountPercent: 0, taxPercent: 21 }), 0.12);
});

test('rechaza porcentajes invalidos', () => {
  assert.throws(() => sut.calculateFinalPrice({ price: 10, discountPercent: 101 }), RangeError);
});

test('valida un borrador por campo', () => {
  assert.deepEqual(sut.validateProductDraft({ name: 'x', price: -1, stock: 1.5 }), {
    name: 'El nombre debe tener al menos 3 caracteres.',
    price: 'El precio debe ser mayor o igual que 0.',
    stock: 'El stock debe ser un entero mayor o igual que 0.'
  });
});

test('acepta un borrador valido sin errores', () => {
  assert.deepEqual(sut.validateProductDraft({ name: 'Monitor', price: 0, stock: 0 }), {});
});

test('comprueba cantidad y stock', () => {
  const product = { stock: 3 };
  assert.equal(sut.canSell(product, 3), true);
  assert.equal(sut.canSell(product, 4), false);
  assert.equal(sut.canSell(product, 1.5), false);
});

test('aplica movimientos sin mutar y bloquea stock negativo', () => {
  const product = Object.freeze({ id: 'a', stock: 3 });
  assert.deepEqual(sut.applyStockMovement(product, -2), { id: 'a', stock: 1 });
  assert.equal(product.stock, 3);
  assert.throws(() => sut.applyStockMovement(product, -4), (error) => {
    assert.equal(error.name, 'StockError');
    assert.equal(error.code, 'STOCK_ERROR');
    assert.equal(error.details.currentStock, 3);
    return true;
  });
});

test('rechaza una cantidad de movimiento que no sea un entero', () => {
  assert.throws(() => sut.applyStockMovement({ stock: 3 }, 1.5), RangeError);
});

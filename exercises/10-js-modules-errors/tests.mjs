import assert from 'node:assert/strict';
import { test } from 'node:test';

const base = new URL('./starter/', import.meta.url);
const { DomainError } = await import(new URL('domain-error.mjs', base));
const { parseProduct, findProductOrThrow } = await import(new URL('product-service.mjs', base));
const { toUserMessage } = await import(new URL('messages.mjs', base));

test('DomainError conserva codigo, detalles y causa', () => {
  const cause = new Error('low level');
  const error = new DomainError('TEST', 'message', { details: { id: 1 }, cause });
  assert.equal(error.code, 'TEST');
  assert.deepEqual(error.details, { id: 1 });
  assert.equal(error.cause, cause);
});

test('parseProduct valida y devuelve solo el contrato', () => {
  assert.deepEqual(parseProduct({ id: '1', name: 'A', price: 2, secret: true }), { id: '1', name: 'A', price: 2 });
  assert.throws(() => parseProduct({ id: 1, name: 'A', price: 2 }), (error) => error.code === 'INVALID_PRODUCT');
});

test('findProductOrThrow devuelve el producto o lanza not found', () => {
  assert.equal(findProductOrThrow([{ id: 'a' }], 'a').id, 'a');
  assert.throws(() => findProductOrThrow([], 'x'), (error) => error.code === 'PRODUCT_NOT_FOUND');
});

test('toUserMessage traduce errores conocidos sin filtrar detalles', () => {
  assert.equal(toUserMessage(new DomainError('PRODUCT_NOT_FOUND', 'interno', { details: { sql: 'secret' } })), 'No encontramos ese producto.');
  assert.equal(toUserMessage(new DomainError('INVALID_PRODUCT', 'interno')), 'Los datos del producto no son válidos.');
  assert.equal(toUserMessage(new Error('secret')), 'No se pudo completar la operacion. Intentalo de nuevo.');
});

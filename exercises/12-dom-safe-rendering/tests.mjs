import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createBrowserFixture } from '../../tests/browser-fixture.mjs';

test('renderiza datos no confiables como texto y conserva una jerarquia accesible', async () => {
  const fixture = await createBrowserFixture('12-dom-safe-rendering');
  try {
    const product = { id: 'x', name: '<img src=x onerror=alert(1)>', category: 'Demo', price: 1, stock: 1 };
    const card = fixture.module.createProductCard(product);
    assert.equal(card.querySelector('img'), null);
    assert.equal(card.querySelector('h2')?.textContent, product.name);
    fixture.module.renderProducts(fixture.document.querySelector('[data-products]'), [product]);
    assert.equal(fixture.document.querySelectorAll('[data-products] h2').length, 1);
  } finally { fixture.cleanup(); }
});

test('reemplaza el render anterior y muestra un estado vacio', async () => {
  const fixture = await createBrowserFixture('12-dom-safe-rendering');
  try {
    const target = fixture.document.querySelector('[data-products]');
    fixture.module.renderProducts(target, [{ id: '1', name: 'Uno', category: 'Demo', price: 1, stock: 4 }]);
    fixture.module.renderProducts(target, []);
    assert.equal(target.children.length, 1);
    assert.match(target.textContent, /no hay productos/i);
  } finally { fixture.cleanup(); }
});


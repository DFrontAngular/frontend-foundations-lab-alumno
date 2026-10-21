import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createBrowserFixture } from '../../tests/browser-fixture.mjs';

function response(body, { status = 200 } = {}) { return { ok: status >= 200 && status < 300, status, async json() { return body; } }; }

test('carga, edita y elimina productos mediante la API', async () => {
  const calls = [];
  const product = { id: 'p1', name: 'Monitor', category: 'Monitores', price: 100, stock: 2 };
  const fixture = await createBrowserFixture('17-http-crud', { fetch: async (url, options = {}) => {
    calls.push({ url, options });
    if (options.method === 'PATCH') return response({ ...product, name: 'Monitor Pro' });
    if (options.method === 'DELETE') return response(undefined, { status: 204 });
    return response({ items: [product] });
  } });
  try {
    await fixture.settle();
    assert.equal(fixture.document.querySelectorAll('[data-product-id]').length, 1);
    fixture.document.querySelector('[data-action="edit"]').click();
    assert.equal(fixture.document.querySelector('[data-form-title]').textContent, 'Editar Monitor');
    fixture.document.querySelector('[name="name"]').value = 'Monitor Pro';
    fixture.document.querySelector('[name="category"]').value = 'Monitores';
    fixture.document.querySelector('[name="price"]').step = 'any';
    fixture.document.querySelector('[name="price"]').value = '100';
    fixture.document.querySelector('[name="stock"]').value = '2';
    fixture.document.querySelector('[data-form]').dispatchEvent(new fixture.window.Event('submit', { bubbles: true, cancelable: true }));
    await fixture.settle();
    assert.ok(calls.some((call) => call.options.method === 'PATCH'));
    assert.match(fixture.document.querySelector('[data-table-body]').textContent, /Monitor Pro/);
    fixture.window.confirm = () => true;
    fixture.document.querySelector('[data-action="delete"]').click();
    await fixture.settle();
    assert.ok(calls.some((call) => call.options.method === 'DELETE'));
    assert.equal(fixture.document.querySelectorAll('[data-product-id]').length, 0);
  } finally { fixture.cleanup(); }
});


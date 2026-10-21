import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createBrowserFixture } from '../../tests/browser-fixture.mjs';

function response(body, { ok = true, status = 200 } = {}) { return { ok, status, async json() { return body; } }; }

test('distingue estados de carga, exito y vacio', async () => {
  const fixture = await createBrowserFixture('16-http-fetch-states', { fetch: async (url) => url.includes('resultado-imposible') ? response({ items: [] }) : response({ items: [{ name: 'Monitor', category: 'Monitores', price: 10 }] }) });
  try {
    const button = fixture.document.querySelector('[data-load]');
    button.click();
    assert.equal(button.disabled, true);
    await fixture.settle();
    assert.match(fixture.document.querySelector('[data-state]').textContent, /Monitor/);
    fixture.document.querySelector('[data-scenario]').value = 'empty';
    button.click();
    await fixture.settle();
    assert.match(fixture.document.querySelector('[data-state]').textContent, /sin resultados/i);
  } finally { fixture.cleanup(); }
});

test('convierte respuestas HTTP y JSON invalidas en un error recuperable', async () => {
  const fixture = await createBrowserFixture('16-http-fetch-states', { fetch: async () => response({ error: { message: 'API caída' } }, { ok: false, status: 500 }) });
  try {
    fixture.document.querySelector('[data-scenario]').value = 'error';
    fixture.document.querySelector('[data-load]').click();
    await fixture.settle();
    assert.match(fixture.document.querySelector('[data-state]').textContent, /API caída/);
    assert.ok(fixture.document.querySelector('[data-state] button'));
  } finally { fixture.cleanup(); }
});


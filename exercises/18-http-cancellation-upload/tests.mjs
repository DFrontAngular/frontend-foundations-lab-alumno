import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createBrowserFixture } from '../../tests/browser-fixture.mjs';

function wait(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }

test('cancela la busqueda anterior cuando llega una nueva consulta', async () => {
  const signals = [];
  const fixture = await createBrowserFixture('18-http-cancellation-upload', { fetch: async (_url, options = {}) => {
    signals.push(options.signal);
    return new Promise(() => {});
  } });
  try {
    await wait(20);
    const input = fixture.document.querySelector('[data-search]');
    input.value = 'monitor';
    input.dispatchEvent(new fixture.window.Event('input', { bubbles: true }));
    await wait(350);
    input.value = 'teclado';
    input.dispatchEvent(new fixture.window.Event('input', { bubbles: true }));
    await wait(350);
    assert.ok(signals.length >= 2);
    assert.equal(signals[0].aborted, true);
  } finally { fixture.cleanup(); }
});

test('envia el upload como FormData sin fijar Content-Type', async () => {
  let request;
  const fixture = await createBrowserFixture('18-http-cancellation-upload', { fetch: async (_url, options = {}) => { request = options; return { ok: true, status: 200, async json() { return { receivedBytes: 12 }; } }; } });
  try {
    await fixture.settle();
    const form = fixture.document.querySelector('[data-upload-form]');
    form.elements.title.value = 'Evidencia';
    const file = new fixture.window.File(['contenido'], 'evidencia.txt', { type: 'text/plain' });
    try { form.elements.file.files = [file]; } catch { Object.defineProperty(form.elements.file, 'files', { configurable: true, value: [file] }); }
    form.dispatchEvent(new fixture.window.Event('submit', { bubbles: true, cancelable: true }));
    await fixture.settle();
    assert.ok(request?.body instanceof fixture.window.FormData);
    assert.equal(request.headers, undefined);
    assert.match(fixture.document.querySelector('[data-upload-status]').textContent, /12/);
  } finally { fixture.cleanup(); }
});


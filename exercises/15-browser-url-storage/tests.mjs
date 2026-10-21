import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createBrowserFixture } from '../../tests/browser-fixture.mjs';

const storageKey = 'frontend-foundations-view-v1';

test('lee filtros desde la URL y conserva la vista en localStorage', async () => {
  const fixture = await createBrowserFixture('15-browser-url-storage', { url: 'http://localhost/exercise/?search=monitor&category=Monitores&sort=price', storage: { [storageKey]: JSON.stringify('list') } });
  try {
    const form = fixture.document.querySelector('[data-filters]');
    assert.equal(form.elements.search.value, 'monitor');
    assert.equal(form.elements.category.value, 'Monitores');
    assert.equal(form.elements.sort.value, 'price');
    assert.equal(fixture.document.querySelector('[value="list"]').checked, true);
  } finally { fixture.cleanup(); }
});

test('actualiza la URL sin parametros vacios y guarda el cambio de vista', async () => {
  const fixture = await createBrowserFixture('15-browser-url-storage');
  try {
    const form = fixture.document.querySelector('[data-filters]');
    form.elements.search.value = 'teclado';
    form.dispatchEvent(new fixture.window.Event('input', { bubbles: true }));
    assert.match(fixture.window.location.search, /search=teclado/);
    assert.doesNotMatch(fixture.window.location.search, /category=/);
    const list = fixture.document.querySelector('[value="list"]');
    list.checked = true;
    list.dispatchEvent(new fixture.window.Event('change', { bubbles: true }));
    assert.equal(JSON.parse(fixture.window.localStorage.getItem(storageKey)), 'list');
    form.reset();
    await new Promise((resolve) => setTimeout(resolve, 50));
    assert.equal(fixture.window.location.search, '');
  } finally { fixture.cleanup(); }
});

test('usa la vista por defecto si localStorage esta corrupto', async () => {
  const fixture = await createBrowserFixture('15-browser-url-storage', { storage: { [storageKey]: '{invalid' } });
  try { assert.equal(fixture.document.querySelector('[value="grid"]').checked, true); }
  finally { fixture.cleanup(); }
});


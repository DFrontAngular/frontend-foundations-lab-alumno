import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createBrowserFixture } from '../../tests/browser-fixture.mjs';

test('muestra errores accesibles y enfoca el primer campo invalido', async () => {
  const fixture = await createBrowserFixture('14-dom-native-forms');
  try {
    const form = fixture.document.querySelector('[data-form]');
    form.dispatchEvent(new fixture.window.Event('submit', { bubbles: true, cancelable: true }));
    assert.equal(fixture.document.activeElement?.name, 'name');
    assert.equal(fixture.document.querySelector('[name="name"]').getAttribute('aria-invalid'), 'true');
    assert.ok(fixture.document.querySelector('[data-error-for="name"]').textContent);
  } finally { fixture.cleanup(); }
});

test('convierte numeros, checkbox y anuncia el alta', async () => {
  const fixture = await createBrowserFixture('14-dom-native-forms');
  try {
    const form = fixture.document.querySelector('[data-form]');
    form.elements.name.value = 'Monitor';
    form.elements.category.value = 'Monitores';
    form.elements.price.step = 'any';
    form.elements.price.value = '129';
    form.elements.stock.value = '3';
    form.elements.featured.checked = true;
    form.dispatchEvent(new fixture.window.Event('submit', { bubbles: true, cancelable: true }));
    assert.equal(fixture.document.querySelectorAll('[data-list] li').length, 1);
    assert.match(fixture.document.querySelector('[data-list]').textContent, /129\.00/);
    assert.match(fixture.document.querySelector('[data-list]').textContent, /destacado/i);
    assert.match(fixture.document.querySelector('[data-status]').textContent, /aÃ±adido|añadido/i);
  } finally { fixture.cleanup(); }
});


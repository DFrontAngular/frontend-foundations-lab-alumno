import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createBrowserFixture } from '../../tests/browser-fixture.mjs';

test('permite crear tareas y delega acciones en la lista', async () => {
  const fixture = await createBrowserFixture('13-dom-event-delegation');
  try {
    const form = fixture.document.querySelector('[data-form]');
    form.elements.title.value = 'Nueva tarea';
    form.dispatchEvent(new fixture.window.Event('submit', { bubbles: true, cancelable: true }));
    await fixture.settle();
    const created = [...fixture.document.querySelectorAll('[data-task-id]')].find((item) => item.textContent.includes('Nueva tarea'));
    assert.ok(created);
    const toggle = created.querySelector('[data-action="toggle"]');
    const nested = fixture.document.createElement('span');
    toggle.append(nested);
    nested.dispatchEvent(new fixture.window.Event('click', { bubbles: true }));
    const toggled = [...fixture.document.querySelectorAll('[data-task-id]')].find((item) => item.textContent.includes('Nueva tarea'));
    assert.equal(toggled.dataset.completed, 'true');
    toggled.querySelector('[data-action="delete"]').click();
    assert.equal(fixture.document.querySelectorAll('[data-task-id]').length, 2);
  } finally { fixture.cleanup(); }
});

test('los controles de tarea tienen nombre accesible y accion semantica', async () => {
  const fixture = await createBrowserFixture('13-dom-event-delegation');
  try {
    for (const button of fixture.document.querySelectorAll('[data-action]')) {
      assert.ok(button.getAttribute('aria-label'));
      assert.ok(['toggle', 'delete'].includes(button.dataset.action));
    }
  } finally { fixture.cleanup(); }
});


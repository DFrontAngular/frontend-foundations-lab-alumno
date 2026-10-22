import { toUserMessage } from './messages.mjs';
import { findProductOrThrow, parseProduct } from './product-service.mjs';

const form = document.querySelector('[data-form]');
const status = document.querySelector('[data-status]');
const output = document.querySelector('[data-output]');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  const source = data.scenario === 'invalid'
    ? [{ id: 7, label: 'Incorrecto' }]
    : data.scenario === 'missing'
      ? []
      : [{ id: 'prd-001', name: 'Teclado', price: 89.9 }];

  try {
    const raw = findProductOrThrow(source, data.id);
    const product = parseProduct(raw);
    status.dataset.kind = 'success';
    status.textContent = 'Producto encontrado.';
    output.textContent = JSON.stringify(product, null, 2);
  } catch (error) {
    console.error(error);
    status.dataset.kind = 'error';
    status.textContent = toUserMessage(error);
    output.textContent = '';
  }
});

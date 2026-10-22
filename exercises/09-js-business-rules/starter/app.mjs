import { applyStockMovement, calculateFinalPrice, canSell, validateProductDraft } from './domain.mjs';

const form = document.querySelector('[data-form]');
const status = document.querySelector('[data-status]');
const output = document.querySelector('[data-output]');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const values = {
    name: String(data.get('name') ?? ''),
    price: Number(data.get('price')),
    discountPercent: Number(data.get('discountPercent')),
    taxPercent: Number(data.get('taxPercent')),
    stock: Number(data.get('stock')),
    quantity: Number(data.get('quantity'))
  };
  const validationErrors = validateProductDraft(values);

  if (Object.keys(validationErrors).length > 0) {
    status.dataset.kind = 'error';
    status.textContent = 'Revisa los datos del producto.';
    output.textContent = JSON.stringify({ validationErrors }, null, 2);
    return;
  }

  const product = Object.freeze({ id: 'demo', name: values.name, stock: values.stock });

  try {
    const allowed = canSell(product, values.quantity);
    const updated = allowed ? applyStockMovement(product, -values.quantity) : product;
    const finalUnitPrice = calculateFinalPrice(values);
    output.textContent = JSON.stringify({ allowed, finalUnitPrice, total: finalUnitPrice * values.quantity, original: product, updated }, null, 2);
    status.dataset.kind = allowed ? 'success' : 'error';
    status.textContent = allowed ? 'Venta valida.' : 'No hay stock suficiente o la cantidad no es valida.';
  } catch (error) {
    status.dataset.kind = 'error';
    status.textContent = error instanceof Error ? error.message : 'Error desconocido.';
  }
});

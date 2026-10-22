import { formatProductStatus, isProduct, type Product, type ProductDraft, type ProductStatus } from './model.js';

const active: ProductStatus = 'ACTIVE';
formatProductStatus(active);

const product: Product = {
  id: 'prd-1',
  name: 'Monitor',
  price: 200,
  stock: 2,
  status: 'ACTIVE',
  createdAt: '2026-10-22'
};

// @ts-expect-error El identificador forma parte de la entidad persistida.
product.id = 'prd-2';

// Debe fallar cuando ProductStatus este correctamente restringido.
// @ts-expect-error ARCHIVED no es un estado soportado.
const archived: ProductStatus = 'ARCHIVED';
void archived;

const draft: ProductDraft = { name: 'Monitor', price: 200, stock: 2, status: 'ACTIVE' };
void draft;

// Debe fallar porque ProductDraft no contiene id.
// @ts-expect-error El identificador lo asigna el backend.
const invalidDraft: ProductDraft = { id: 'x', name: 'Monitor', price: 200, stock: 2, status: 'ACTIVE' };
void invalidDraft;

const external: unknown = {};
if (isProduct(external)) {
  const product: Product = external;
  product.name.toUpperCase();
}

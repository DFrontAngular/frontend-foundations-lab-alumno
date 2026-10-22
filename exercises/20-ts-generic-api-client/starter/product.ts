import { parsePage, requestJson, type Page, type Parser } from './api-client.js';

export interface Product {
  readonly id: string;
  name: string;
  price: number;
}

export const parseProduct: Parser<Product> = (value) => {
  // TODO: valida id, name y price sin hacer casts ciegos.
  throw new Error('Parser de producto no implementado.');
};

export function getProducts(fetcher: typeof fetch = fetch): Promise<Page<Product>> {
  return requestJson('/api/products', {
    parser: parsePage(parseProduct),
    fetcher
  });
}

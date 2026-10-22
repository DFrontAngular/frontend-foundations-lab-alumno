import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const source = path.join(root, 'exercises', '20-ts-generic-api-client', 'starter');
const output = await mkdtemp(path.join(os.tmpdir(), 'frontend-foundations-ts-'));

await new Promise((resolve, reject) => {
  const child = spawn(process.execPath, [
    path.join(root, 'node_modules', 'typescript', 'bin', 'tsc'),
    '--target', 'ES2023',
    '--module', 'NodeNext',
    '--moduleResolution', 'NodeNext',
    '--outDir', output,
    '--rootDir', source,
    path.join(source, 'api-client.ts'),
    path.join(source, 'product.ts')
  ], { cwd: root });
  child.on('error', reject);
  child.on('exit', (code) => code === 0 ? resolve() : reject(new Error(`TypeScript terminó con código ${code}.`)));
});

const api = await import(pathToFileURL(path.join(output, 'api-client.js')).href);
const product = await import(pathToFileURL(path.join(output, 'product.js')).href);

function response({ ok = true, status = 200, body }) {
  return { ok, status, json: async () => body };
}

test.after(async () => {
  await rm(output, { recursive: true, force: true });
});

test('requestJson usa el parser y no confía en JSON sin validar', async () => {
  await assert.rejects(
    api.requestJson('/products', { parser: product.parseProduct, fetcher: async () => response({ body: { id: 3 } }) }),
    (error) => error.name === 'ApiContractError'
  );
});

test('requestJson conserva el status de un error HTTP', async () => {
  await assert.rejects(
    api.requestJson('/products', { parser: product.parseProduct, fetcher: async () => response({ ok: false, status: 503, body: {} }) }),
    (error) => error.name === 'ApiError' && error.status === 503
  );
});

test('parsePage compone el parser de cada item', () => {
  const parser = api.parsePage(product.parseProduct);
  assert.deepEqual(parser({
    items: [{ id: 'p-1', name: 'Monitor', price: 200 }],
    meta: { page: 1, total: 1, totalPages: 1 }
  }), {
    items: [{ id: 'p-1', name: 'Monitor', price: 200 }],
    meta: { page: 1, total: 1, totalPages: 1 }
  });
});

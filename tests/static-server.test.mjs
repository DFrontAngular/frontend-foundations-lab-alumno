import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { createAppServer } from '../server/app-server.mjs';

let server;
let baseUrl;

before(async () => {
  server = createAppServer();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  baseUrl = `http://127.0.0.1:${address.port}`;
});

after(async () => {
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
});

test('sirve el portal', async () => {
  const response = await fetch(baseUrl);
  assert.equal(response.status, 200);
  assert.match(await response.text(), /Frontend Foundations Lab/);
});

test('sirve los starters', async () => {
  const starter = await fetch(`${baseUrl}/exercises/16-http-fetch-states/starter/`);
  assert.equal(starter.status, 200);
});

test('sirve la guia de ejercicios antes del starter', async () => {
  const guide = await fetch(`${baseUrl}/exercise/?id=01-html-semantic-page`);
  assert.equal(guide.status, 200);
  assert.match(await guide.text(), /Instrucciones guiadas/);
});

test('no permite traversal', async () => {
  const response = await fetch(`${baseUrl}/..%2F..%2Fetc%2Fpasswd`);
  assert.ok([403, 404].includes(response.status));
});

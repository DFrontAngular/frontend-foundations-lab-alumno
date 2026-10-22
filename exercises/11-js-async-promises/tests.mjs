import assert from 'node:assert/strict';
import { test } from 'node:test';

const sut = await import(new URL('./starter/async-tools.mjs', import.meta.url));

test('withTimeout entrega el resultado antes del limite', async () => {
  const value = await sut.withTimeout(async () => 'ok', 100);
  assert.equal(value, 'ok');
});

test('withTimeout aborta una operacion lenta', async () => {
  let aborted = false;
  await assert.rejects(
    sut.withTimeout((signal) => new Promise((resolve, reject) => {
      const timer = setTimeout(resolve, 500);
      signal.addEventListener('abort', () => {
        aborted = true;
        clearTimeout(timer);
        reject(signal.reason);
      }, { once: true });
    }), 20),
    (error) => error.name === 'TimeoutError'
  );
  assert.equal(aborted, true);
});

test('retry respeta el numero de reintentos', async () => {
  let calls = 0;
  const result = await sut.retry(async () => {
    calls += 1;
    if (calls < 3) throw new Error('temporal');
    return 'ok';
  }, { retries: 2 });
  assert.equal(result, 'ok');
  assert.equal(calls, 3);
});

test('retry puede decidir no reintentar', async () => {
  let calls = 0;
  await assert.rejects(sut.retry(async () => {
    calls += 1;
    throw new TypeError('permanente');
  }, { retries: 5, shouldRetry: (error) => !(error instanceof TypeError) }), TypeError);
  assert.equal(calls, 1);
});

test('retry no reintenta una cancelacion', async () => {
  let calls = 0;
  const abortError = new DOMException('Abortado', 'AbortError');
  await assert.rejects(sut.retry(async () => {
    calls += 1;
    throw abortError;
  }, { retries: 3 }), (error) => error === abortError);
  assert.equal(calls, 1);
});

test('loadDashboard arranca loaders concurrentemente y conserva parciales', async () => {
  const starts = [];
  let release;
  const gate = new Promise((resolve) => { release = resolve; });
  const resultPromise = sut.loadDashboard({
    first: async () => { starts.push('first'); await gate; return 1; },
    second: async () => { starts.push('second'); throw new Error('fallo'); },
    third: async () => { starts.push('third'); await gate; return 3; }
  });
  await Promise.resolve();
  assert.deepEqual(starts, ['first', 'second', 'third']);
  release();
  const result = await resultPromise;
  assert.deepEqual(result.data, { first: 1, third: 3 });
  assert.equal(result.errors.second.message, 'fallo');
});

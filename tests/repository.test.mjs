import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { exercises } from '../site/curriculum.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('el curriculum contiene 22 ejercicios y un capstone', () => {
  assert.equal(exercises.length, 23);
  assert.equal(exercises.filter((item) => item.module === 'capstone').length, 1);
  assert.equal(new Set(exercises.map((item) => item.id)).size, 23);
});

test('cada entrada tiene starter', async () => {
  for (const exercise of exercises) {
    const starter = exercise.module === 'capstone'
      ? 'capstone/starter/index.html'
      : `exercises/${exercise.id}/starter/index.html`;
    await access(path.join(root, starter));
  }
});

test('el diagnostico incluye enunciado y starter', async () => {
  await access(path.join(root, 'diagnostic/README.md'));
  await access(path.join(root, 'diagnostic/starter/index.html'));
});

test('el README documenta el arranque y el criterio de Angular', async () => {
  const readme = await readFile(path.join(root, 'README.md'), 'utf8');
  assert.match(readme, /npm run dev/);
  assert.match(readme, /Criterio de paso a Angular/);
  assert.match(readme, /23 retos/);
  assert.match(readme, /prueba diagnóstica/i);
});

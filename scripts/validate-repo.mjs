import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { exercises } from '../site/curriculum.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];

async function exists(relativePath) {
  try {
    await access(path.join(root, relativePath));
    return true;
  } catch {
    return false;
  }
}

const ids = new Set();
for (const exercise of exercises) {
  if (ids.has(exercise.id)) errors.push(`Identificador duplicado: ${exercise.id}`);
  ids.add(exercise.id);

  const isCapstone = exercise.module === 'capstone';
  const base = isCapstone ? 'capstone' : `exercises/${exercise.id}`;
  const starterIndex = isCapstone ? 'capstone/starter/index.html' : `${base}/starter/index.html`;
  if (!isCapstone && !(await exists(`${base}/README.md`))) errors.push(`Falta README: ${base}`);
  if (!(await exists(starterIndex))) errors.push(`Falta starter: ${starterIndex}`);

  const expectedUrl = isCapstone ? '/capstone/starter/' : `/exercises/${exercise.id}/starter/`;
  if (exercise.starterUrl !== expectedUrl) {
    errors.push(`starterUrl incorrecta en ${exercise.id}: ${exercise.starterUrl}`);
  }
}

for (const requiredPath of [
  'diagnostic/README.md',
  'diagnostic/starter/index.html'
]) {
  if (!(await exists(requiredPath))) errors.push(`Falta recurso diagnostico: ${requiredPath}`);
}

const packageJson = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'));
for (const requiredScript of ['dev', 'check', 'test', 'verify', 'test:exercise', 'typecheck:exercise']) {
  if (!packageJson.scripts?.[requiredScript]) errors.push(`Falta script npm: ${requiredScript}`);
}

if (exercises.length !== 23) errors.push(`Se esperaban 23 ejercicios y hay ${exercises.length}.`);

if (errors.length > 0) {
  console.error('Validacion fallida:\n');
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Repositorio valido: ${exercises.length} ejercicios y starters presentes.`);
}

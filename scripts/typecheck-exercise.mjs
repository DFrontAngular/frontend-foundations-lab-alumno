import { access } from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { exercises } from '../site/curriculum.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const requested = process.argv[2];

if (!requested) {
  console.error('Uso: npm run typecheck:exercise -- 19');
  process.exit(1);
}

const padded = /^\d+$/.test(requested) ? requested.padStart(2, '0') : requested;
const exercise = exercises.find((item) => item.number === padded || item.id === requested);
if (!exercise || exercise.module !== 'typescript') {
  console.error(`El ejercicio ${requested} no es un ejercicio TypeScript con typecheck.`);
  process.exit(1);
}

const projectFile = path.join(root, 'exercises', exercise.id, 'tsconfig.json');
try {
  await access(projectFile);
} catch {
  console.error(`No existe ${projectFile}.`);
  process.exit(1);
}

const typeScriptExecutable = path.join(root, 'node_modules', 'typescript', 'bin', 'tsc');
const child = spawn(process.execPath, [typeScriptExecutable, '--project', projectFile], {
  cwd: root,
  stdio: 'inherit'
});

child.on('error', (error) => {
  console.error(`No se pudo ejecutar TypeScript: ${error.message}`);
  process.exit(1);
});

child.on('exit', (code, signal) => {
  if (signal) process.exit(1);
  process.exit(code ?? 1);
});

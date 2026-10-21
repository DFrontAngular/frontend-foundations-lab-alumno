import { access, readdir } from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const exerciseRoot = path.join(root, 'exercises');
const directories = await readdir(exerciseRoot, { withFileTypes: true });
const testFiles = [];
for (const directory of directories.filter((entry) => entry.isDirectory()).sort((a, b) => a.name.localeCompare(b.name))) {
  if (!/^\d{2}-/.test(directory.name)) continue;
  const testFile = path.join(exerciseRoot, directory.name, 'tests.mjs');
  try { await access(testFile); testFiles.push(testFile); } catch {}
}

if (testFiles.length === 0) {
  console.error('No hay ejercicios con tests.mjs.');
  process.exit(1);
}

const child = spawn(process.execPath, ['--test', ...testFiles], { cwd: root, stdio: 'inherit', env: process.env });
child.on('error', (error) => { console.error(`No se pudieron ejecutar los tests: ${error.message}`); process.exit(1); });
child.on('exit', (code, signal) => process.exit(signal ? 1 : (code ?? 1)));

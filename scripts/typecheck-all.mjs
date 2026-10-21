import { access } from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const projects = [];
const rootProject = path.join(root, 'tsconfig.json');
try {
  await access(rootProject);
  projects.push(rootProject);
} catch {
  for (const id of ['19-ts-domain-modeling', '20-ts-generic-api-client', '21-ts-state-and-utility-types']) {
    projects.push(path.join(root, 'exercises', id, 'tsconfig.json'));
  }
}

const executable = process.execPath;
const typeScriptExecutable = path.join(root, 'node_modules', 'typescript', 'bin', 'tsc');
for (const project of projects) {
  const code = await new Promise((resolve) => {
    const child = spawn(executable, [typeScriptExecutable, '--project', project], { cwd: root, stdio: 'inherit' });
    child.on('error', (error) => { console.error(`No se pudo ejecutar TypeScript: ${error.message}`); resolve(1); });
    child.on('exit', (exitCode) => resolve(exitCode ?? 1));
  });
  if (code !== 0) process.exit(code);
}

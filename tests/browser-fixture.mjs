import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { Window } from 'happy-dom';

const root = fileURLToPath(new URL('..', import.meta.url));

function exerciseDirectory(id) { return path.join(root, 'exercises', id); }
function solutionPath(id) { return path.join(root, 'solutions', id, 'app.mjs'); }
function starterPath(id) { return path.join(exerciseDirectory(id), 'starter', 'app.mjs'); }

export async function createBrowserFixture(id, { url = 'http://localhost/', storage = {}, fetch = undefined } = {}) {
  const html = await readFile(path.join(exerciseDirectory(id), 'starter', 'index.html'), 'utf8');
  const window = new Window({ url });
  window.document.write(html);
  window.document.close();
  for (const [key, value] of Object.entries(storage)) window.localStorage.setItem(key, value);
  const previous = new Map();
  const globals = ['window', 'document', 'location', 'history', 'localStorage', 'FormData', 'File', 'Blob', 'Event', 'CustomEvent', 'SubmitEvent', 'InputEvent', 'KeyboardEvent', 'MouseEvent', 'DOMException', 'HTMLInputElement', 'HTMLSelectElement', 'HTMLTextAreaElement', 'CSS', 'URL', 'URLSearchParams'];
  for (const name of globals) { previous.set(name, globalThis[name]); globalThis[name] = window[name]; }
  if (fetch) { previous.set('fetch', globalThis.fetch); globalThis.fetch = fetch; }
  const variant = process.env.EXERCISE_VARIANT === 'solution' ? 'solution' : 'starter';
  const modulePath = variant === 'solution' ? solutionPath(id) : starterPath(id);
  const module = await import(`${pathToFileURL(modulePath).href}?fixture=${Date.now()}-${Math.random()}`);
  return { window, module, document: window.document, async settle() { await window.happyDOM.whenAsyncComplete(); await new Promise((resolve) => setImmediate(resolve)); }, cleanup() { for (const [name, value] of previous) { if (value === undefined) delete globalThis[name]; else globalThis[name] = value; } window.close(); } };
}

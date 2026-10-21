import { exercises, getReadmeUrl, modules } from './curriculum.mjs';

const guide = document.querySelector('[data-guide]');
const id = new URLSearchParams(window.location.search).get('id');
const exercise = exercises.find((item) => item.id === id);

function element(name, text = '') {
  const node = document.createElement(name);
  node.textContent = text;
  return node;
}

function moduleLabel(moduleId) {
  return modules.find((item) => item.id === moduleId)?.label ?? moduleId;
}

function addInlineText(target, source) {
  const parts = source.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  for (const part of parts) {
    if (part.startsWith('`') && part.endsWith('`')) {
      target.append(element('code', part.slice(1, -1)));
    } else if (part.startsWith('**') && part.endsWith('**')) {
      target.append(element('strong', part.slice(2, -2)));
    } else {
      target.append(document.createTextNode(part));
    }
  }
}

function renderReadme(markdown) {
  const fragment = document.createDocumentFragment();
  let list;

  for (const rawLine of markdown.replaceAll('\r', '').split('\n')) {
    const line = rawLine.trim();
    if (!line) {
      list = undefined;
      continue;
    }
    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      const headingNode = document.createElement(`h${Math.min(heading[1].length + 1, 4)}`);
      addInlineText(headingNode, heading[2]);
      fragment.append(headingNode);
      list = undefined;
      continue;
    }
    const item = line.match(/^(?:[-*]|\d+\.)\s+(?:\[([ xX])\]\s+)?(.+)$/);
    if (item) {
      if (!list) {
        list = document.createElement(/^\d+\./.test(line) ? 'ol' : 'ul');
        fragment.append(list);
      }
      const listItem = document.createElement('li');
      if (item[1] !== undefined) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item[1].toLowerCase() === 'x';
        checkbox.disabled = true;
        listItem.append(checkbox, ' ');
      }
      addInlineText(listItem, item[2]);
      list.append(listItem);
      continue;
    }
    if (line.startsWith('```')) {
      list = undefined;
      continue;
    }
    const paragraph = element('p');
    addInlineText(paragraph, line);
    fragment.append(paragraph);
    list = undefined;
  }
  return fragment;
}

function renderMissing() {
  guide.replaceChildren(
    element('h1', 'No hemos encontrado ese ejercicio'),
    element('p', 'Vuelve al catalogo y elige un ejercicio para ver sus instrucciones.'),
    Object.assign(element('a', 'Volver al catalogo'), { href: '/', className: 'button' })
  );
}

async function render() {
  if (!exercise) {
    renderMissing();
    return;
  }

  document.title = `${exercise.number} · ${exercise.title} | Instrucciones`;
  const hero = document.createElement('section');
  hero.className = 'guide-hero card';
  const eyebrow = element('p', `${moduleLabel(exercise.module)} · ${exercise.duration}`);
  eyebrow.className = 'section-kicker';
  const title = element('h1', `${exercise.number} · ${exercise.title}`);
  hero.append(eyebrow, title);

  const steps = document.createElement('section');
  steps.className = 'next-steps card';
  steps.setAttribute('aria-labelledby', 'start-steps-title');
  steps.append(element('p', 'Tu camino, paso a paso'));
  const stepsTitle = element('h2', 'Antes de tocar el codigo');
  stepsTitle.id = 'start-steps-title';
  const orderedSteps = document.createElement('ol');
  for (const text of [
    'Lee la tarea y los criterios de aceptacion de esta pagina.',
    'Abre el entorno de trabajo solo cuando tengas claro el primer cambio que haras.',
    'Haz cambios pequenos, guarda y comprueba el resultado en el navegador.',
    'Cuando termines, revisa la lista de criterios uno a uno.'
  ]) orderedSteps.append(element('li', text));
  const start = element('a', 'Entendido: abrir el entorno de trabajo');
  start.className = 'button';
  start.href = exercise.starterUrl;
  steps.append(stepsTitle, orderedSteps, start);

  const content = document.createElement('section');
  content.className = 'guide-content card';
  content.setAttribute('aria-label', 'Enunciado completo');
  content.append(element('p', 'Enunciado completo'), element('p', 'Cargando las instrucciones…'));
  guide.replaceChildren(hero, steps, content);

  try {
    const response = await fetch(getReadmeUrl(exercise));
    if (!response.ok) throw new Error('No se pudo cargar el enunciado.');
    content.replaceChildren(element('p', 'Enunciado completo'), renderReadme(await response.text()));
  } catch {
    content.replaceChildren(
      element('h2', 'No se han podido cargar las instrucciones'),
      element('p', 'Vuelve al catalogo e intentalo de nuevo. Si el problema continua, avisa a tu formador.')
    );
  }
}

render();

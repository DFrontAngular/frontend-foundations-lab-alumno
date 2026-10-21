import { exercises, getGuideUrl, modules } from './curriculum.mjs';

const storageKey = 'frontend-foundations-progress-v1';
const elements = {
  filters: document.querySelector('[data-filters]'),
  grid: document.querySelector('[data-exercise-grid]'),
  template: document.querySelector('#exercise-card-template'),
  resultsCount: document.querySelector('[data-results-count]'),
  empty: document.querySelector('[data-empty-results]'),
  progress: document.querySelector('[data-progress]'),
  progressCount: document.querySelector('[data-progress-count]'),
  resetProgress: document.querySelector('[data-reset-progress]')
};

const state = {
  search: '',
  module: 'all',
  status: 'all',
  progress: readProgress()
};

function readProgress() {
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey) ?? '{}');
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function saveProgress() {
  localStorage.setItem(storageKey, JSON.stringify(state.progress));
}

function normalize(value) {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('es');
}

function moduleLabel(moduleId) {
  return modules.find((item) => item.id === moduleId)?.label ?? moduleId;
}

function isVisible(exercise) {
  const haystack = normalize(`${exercise.title} ${exercise.description} ${exercise.objectives.join(' ')}`);
  const matchesSearch = !state.search || haystack.includes(normalize(state.search));
  const matchesModule = state.module === 'all' || exercise.module === state.module;
  const completed = Boolean(state.progress[exercise.id]);
  const matchesStatus = state.status === 'all'
    || (state.status === 'completed' && completed)
    || (state.status === 'pending' && !completed);
  return matchesSearch && matchesModule && matchesStatus;
}

function updateProgress() {
  const completed = exercises.filter((exercise) => Boolean(state.progress[exercise.id])).length;
  elements.progress.value = completed;
  elements.progress.max = exercises.length;
  elements.progress.textContent = `${Math.round((completed / exercises.length) * 100)} %`;
  elements.progressCount.textContent = `${completed} de ${exercises.length}`;
}

function createCard(exercise) {
  const fragment = elements.template.content.cloneNode(true);
  const card = fragment.querySelector('.exercise-card');
  const checkbox = fragment.querySelector('[data-complete]');
  const openLink = fragment.querySelector('[data-open]');
  const completed = Boolean(state.progress[exercise.id]);

  card.dataset.completed = String(completed);
  card.querySelector('.exercise-number').textContent = `Ejercicio ${exercise.number}`;
  card.querySelector('.exercise-badge').textContent = exercise.difficulty;
  card.querySelector('.exercise-module').textContent = moduleLabel(exercise.module);
  card.querySelector('.exercise-title').textContent = exercise.title;
  card.querySelector('[data-duration]').textContent = exercise.duration;
  card.querySelector('[data-format]').textContent = exercise.format;
  checkbox.checked = completed;
  checkbox.setAttribute('aria-label', `Marcar ${exercise.title} como completado`);
  openLink.href = getGuideUrl(exercise);

  checkbox.addEventListener('change', () => {
    state.progress[exercise.id] = checkbox.checked;
    if (!checkbox.checked) delete state.progress[exercise.id];
    saveProgress();
    render();
  });

  return fragment;
}

function render() {
  const visible = exercises.filter(isVisible);
  elements.grid.replaceChildren(...visible.map(createCard));
  elements.resultsCount.textContent = `${visible.length} ${visible.length === 1 ? 'ejercicio' : 'ejercicios'}`;
  elements.empty.hidden = visible.length > 0;
  updateProgress();
}

for (const module of modules) {
  const option = document.createElement('option');
  option.value = module.id;
  option.textContent = module.label;
  elements.filters.elements.module.append(option);
}

elements.filters.addEventListener('input', () => {
  const data = new FormData(elements.filters);
  state.search = String(data.get('search') ?? '');
  state.module = String(data.get('module') ?? 'all');
  state.status = String(data.get('status') ?? 'all');
  render();
});

elements.resetProgress.addEventListener('click', () => {
  const confirmed = window.confirm('Se eliminara el progreso guardado en este navegador.');
  if (!confirmed) return;
  state.progress = {};
  saveProgress();
  render();
});

render();

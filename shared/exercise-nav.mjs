const exerciseId = document.documentElement.dataset.exerciseId;
const exerciseTitle = document.documentElement.dataset.exerciseTitle ?? document.title;
const storageKey = 'frontend-foundations-progress-v1';

function readProgress() {
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey) ?? '{}');
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function writeProgress(progress) {
  localStorage.setItem(storageKey, JSON.stringify(progress));
}

const navigation = document.createElement('header');
navigation.className = 'exercise-nav';
navigation.innerHTML = `
  <div class="container exercise-nav__inner">
    <div class="exercise-nav__identity">
      <strong></strong>
      <span>Frontend Foundations Lab</span>
    </div>
    <div>
      <a class="button button--secondary" href="/">Volver al itinerario</a>
      <a class="button button--secondary" data-instructions href="/exercise/">Ver instrucciones</a>
      <button class="button" type="button" data-complete>Marcar completado</button>
    </div>
  </div>
`;

navigation.querySelector('strong').textContent = exerciseTitle;
navigation.querySelector('[data-instructions]').href = `/exercise/?id=${encodeURIComponent(exerciseId ?? '')}`;
const completeButton = navigation.querySelector('[data-complete]');

function updateCompleteButton() {
  if (!exerciseId) {
    completeButton.hidden = true;
    return;
  }
  const completed = Boolean(readProgress()[exerciseId]);
  completeButton.textContent = completed ? 'Completado' : 'Marcar completado';
  completeButton.setAttribute('aria-pressed', String(completed));
}

completeButton.addEventListener('click', () => {
  const progress = readProgress();
  progress[exerciseId] = !progress[exerciseId];
  writeProgress(progress);
  updateCompleteButton();
});

document.body.prepend(navigation);
updateCompleteButton();

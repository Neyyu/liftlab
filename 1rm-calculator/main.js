const weightInput = document.getElementById('weight');
const repsInput = document.getElementById('reps');
const unitSelect = document.getElementById('unit');
const formulaSelect = document.getElementById('formula');
const form = document.getElementById('rm-form');
const oneRepMaxEl = document.getElementById('one-rep-max');
const pct65El = document.getElementById('pct65');
const pct75El = document.getElementById('pct75');
const pct85El = document.getElementById('pct85');
const pct95El = document.getElementById('pct95');

const formulas = {
  epley: (weight, reps) => weight * (1 + reps / 30),
  brzycki: (weight, reps) => weight / (1.0278 - 0.0278 * reps),
  lombardi: (weight, reps) => weight * Math.pow(reps, 0.1),
  oconner: (weight, reps) => weight * (1 + 0.025 * reps),
};

function toLb(value, unit) {
  return unit === 'kg' ? value * 2.20462 : value;
}

function fromLb(value, unit) {
  return unit === 'kg' ? value / 2.20462 : value;
}

function formatWeight(value, unit) {
  return `${new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(value)} ${unit}`;
}

function updateCalculator() {
  const weight = Number(weightInput.value);
  const reps = Number(repsInput.value);
  const unit = unitSelect.value;
  const formulaKey = formulaSelect.value;

  if (!weight || !reps || weight <= 0 || reps <= 0) {
    oneRepMaxEl.textContent = '0 kg';
    pct65El.textContent = '0 kg';
    pct75El.textContent = '0 kg';
    pct85El.textContent = '0 kg';
    pct95El.textContent = '0 kg';
    return;
  }

  const weightInLb = toLb(weight, unit);
  const oneRmLb = formulas[formulaKey](weightInLb, reps);
  const oneRm = fromLb(oneRmLb, unit);

  oneRepMaxEl.textContent = formatWeight(oneRm, unit);
  pct65El.textContent = formatWeight(fromLb(oneRmLb * 0.65, unit), unit);
  pct75El.textContent = formatWeight(fromLb(oneRmLb * 0.75, unit), unit);
  pct85El.textContent = formatWeight(fromLb(oneRmLb * 0.85, unit), unit);
  pct95El.textContent = formatWeight(fromLb(oneRmLb * 0.95, unit), unit);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  updateCalculator();
});

[weightInput, repsInput, unitSelect, formulaSelect].forEach((element) => {
  element.addEventListener('input', updateCalculator);
  element.addEventListener('change', updateCalculator);
});

updateCalculator();

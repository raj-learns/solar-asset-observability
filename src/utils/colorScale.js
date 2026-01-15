export function getColorFromNormalizedValue(t) {
  const clamped = Math.max(0, Math.min(1, t));

  let r, g, b = 0;

  if (clamped < 0.5) {
    // Red to Yellow
    const ratio = clamped / 0.5;
    r = 255;
    g = Math.floor(255 * ratio);
  } else {
    // Yellow to Green
    const ratio = (clamped - 0.5) / 0.5;
    r = Math.floor(255 * (1 - ratio));
    g = 255;
  }

  return `rgb(${r}, ${g}, ${b})`;
}

export function normalizePRValues(prValuesForDay) {
  const validValues = Object.values(prValuesForDay).filter(v => !isNaN(v));

  const min = Math.min(...validValues);
  const max = Math.max(...validValues);

  return function (value) {
    if (isNaN(value)) return null;
    if (max === min) return 0.5; // avoid divide by zero
    return (value - min) / (max - min);
  };
}

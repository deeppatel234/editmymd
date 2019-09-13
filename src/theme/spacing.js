const DEFAULT_FACTOR = 8;

const spacing = (factor = DEFAULT_FACTOR) => (...units) =>
  units.map(u => `${u * factor}px`).join(' ');

export default spacing;

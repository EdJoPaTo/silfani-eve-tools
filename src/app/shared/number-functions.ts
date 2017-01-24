const allLetters = ['', 'k', 'M', 'B', 'T'];

export function formatNumberShort(value: number, isInteger = false): string {
  if (!value && value !== 0) { return 'NaN'; }

  const exponent = value !== 0 ? Math.ceil(Math.log10(value)) : 0;
  const engineerExponentLevel = Math.max(0, Math.floor((exponent - 1) / 3));
  const engineerExponent = engineerExponentLevel * 3;
  const letter = allLetters[engineerExponentLevel];
  const shortValue = value / Math.pow(10, engineerExponent);

  let fractionDigits = Math.min(2, 3 - (exponent - engineerExponent));
  if (isInteger && engineerExponentLevel === 0) {
    fractionDigits = 0;
  }

  const valueString = shortValue.toFixed(fractionDigits);
  return valueString + letter;
}

export function formatNumberDefault(value: number): string {
  if (!value) { return 'NaN'; }
  // http://stackoverflow.com/a/14428340
  return value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

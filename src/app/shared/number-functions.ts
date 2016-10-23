const allLetters = ['', 'k', 'M', 'B', 'T'];

export function formatNumberShort(value: number): string {
  if (!value) { return 'NaN'; }

  let exponent = value !== 0 ? Math.ceil(Math.log10(value)) : 0;
  let engineerExponentLevel = Math.max(0, Math.floor((exponent - 1) / 3));
  let engineerExponent = engineerExponentLevel * 3;
  let letter = allLetters[engineerExponentLevel];
  let shortValue = value / Math.pow(10, engineerExponent);

  let fractionDigits = Math.min(2, 3 - (exponent - engineerExponent));

  let valueString = shortValue.toFixed(fractionDigits);
  return valueString + letter;
}

export function formatNumberDefault(value: number): string {
  // http://stackoverflow.com/a/14428340
  return value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

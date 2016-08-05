const allLetters = ['', 'k', 'M', 'B', 'T'];

export function formatNumberShort(value: number): string {
  let exponent = Math.ceil(Math.log10(value));
  let engineerExponentLevel = Math.floor(exponent / 3);
  let engineerExponent = engineerExponentLevel * 3;
  let letter = allLetters[engineerExponentLevel];
  let shortValue = value / Math.pow(10, engineerExponent);

  let fractionDigits = Math.min(2, 3 - exponent % 3);

  let valueString = shortValue.toFixed(fractionDigits);
  return valueString + letter;
}

export function formatNumberDefault(value: number): string {
  // http://stackoverflow.com/a/14428340
  return value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

export const Round = (value: number, precision = 0) =>
  Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);

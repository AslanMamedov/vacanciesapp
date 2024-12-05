export const generateSteps = (steps: number = 15) =>
  Array.from({ length: steps }, (_, index) => index + 1);

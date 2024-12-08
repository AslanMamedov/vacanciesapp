export const formatPhoneNumber = (input: string = '') => {
  const cleanInput = input?.replace(/\D/g, '');
  if (cleanInput.length < 7) {
    throw new Error('Input string must contain at least 7 digits.');
  }
  const formatted =
    cleanInput.slice(0, 3) +
    '-' +
    cleanInput.slice(3, 5) +
    '-' +
    cleanInput.slice(5, 7);
  return formatted;
};

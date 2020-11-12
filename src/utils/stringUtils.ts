export const capitalize = (word: string) => {
  const firstLetter = word[0].toUpperCase();
  const rest = word.substr(1, word.length);
  return firstLetter + rest;
};

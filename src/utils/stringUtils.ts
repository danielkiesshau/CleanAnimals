export const capitalize = (word: string) => {
  const firstLetter = word[0].toUpperCase();
  const rest = word.substr(1, word.length);
  return firstLetter + rest;
};

export const dashCamelCase = (word: string) => {
  return word.replace(/([A-Z])/g, '-$1').replace(/^./, function (str) {
    return str.toUpperCase();
  });
};

export function dashToCamelCase(word: string) {
  return word.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase();
  });
}
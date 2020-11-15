export function getRandomInt(min = 0, max = 0, noNegative?: boolean) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomInt = Math.floor(Math.random() * (max - min)) + min;
  return randomInt < 0 && noNegative ? 0 : randomInt;
}

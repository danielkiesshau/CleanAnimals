import { getRandomInt } from './numberUtils';

test('should return a number', () => {
  const random = getRandomInt();
  expect(typeof random).toBe('number');
});

test('should not return a negative number', () => {
  const random = getRandomInt(-100, -1, true);
  expect(random).toBeGreaterThanOrEqual(0);
});

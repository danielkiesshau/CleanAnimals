import { capitalize, camelCaseDash, dashToCamelCase } from './stringUtils';

test('should have first letter Capitalized', () => {
  const result = capitalize('banana');
  expect(result).toBe('Banana');
});

test('should camel case first letter after dash', () => {
  const result = dashToCamelCase('Special-defense');
  expect(result).toBe('SpecialDefense');
});

test('should add dash for Capital letters', () => {
  const result = camelCaseDash('specialAttack');
  expect(result).toBe('Special-Attack');
});

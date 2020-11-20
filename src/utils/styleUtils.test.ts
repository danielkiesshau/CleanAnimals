import { getConstratedColor, hexToRgb } from './styleUtils';

test('should get contrasted Color', () => {
  const result = getConstratedColor('#000000');
  expect(result).toBe('#ffffff');
});

test('should convert HEX to RGB', () => {
  const result = hexToRgb('#000000');
  expect(result).toEqual({
    r: 0,
    g: 0,
    b: 0,
  });
});

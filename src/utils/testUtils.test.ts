import { sleep } from './testUtils';

test('sleep should return a promise', () => {
  expect(sleep(300)).toBeInstanceOf(Promise);
});

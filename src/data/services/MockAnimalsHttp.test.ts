import { API_CLASS } from '@env';
import MockAnimalsHttp from './MockAnimalsHttp';
const APIs = {
  DOG: 'Standard Schnauzer',
  POKEMON: 'sparrow',
};

describe('MockAnimalsHttp', () => {
  let client: MockAnimalsHttp;

  beforeEach(() => {
    client = new MockAnimalsHttp();
  });

  test('`getAnimals` should return an array', async () => {
    const isArray = Array.isArray(await client.getAnimals(0, 10));
    expect(isArray).toBeTruthy();
  });

  const testWord = APIs[API_CLASS];
  test(`filter '${testWord}' should return results that contain that word`, async () => {
    const result = await client.getAnimalByName(testWord);

    expect(
      result.find((a) => a.name?.toLowerCase() === testWord.toLowerCase()),
    ).toBeTruthy();
  });

  test(`should get animal by ref '${testWord}'`, async () => {
    const result = await client.getAnimal(testWord);

    expect(result).not.toBeUndefined();
  });
});

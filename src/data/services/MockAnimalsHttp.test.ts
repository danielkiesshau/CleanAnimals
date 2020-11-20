import MockAnimalsHttp from './MockAnimalsHttp';
describe('MockAnimalsHttp', () => {
  let client: MockAnimalsHttp;

  beforeEach(() => {
    client = new MockAnimalsHttp();
  });

  test('`getAnimals` should return an array', async () => {
    const isArray = Array.isArray(await client.getAnimals(0, 10));
    expect(isArray).toBeTruthy();
  });

  const testWord = 'sparrow';
  test(`filter '${testWord}' should return results that contain that word`, async () => {
    const result = await client.getAnimalByName(testWord);

    expect(
      result.find((a) => a.name.toLowerCase().includes(testWord.toLowerCase())),
    ).toBeTruthy();
  });

  test(`should get animal by ref '${testWord}'`, async () => {
    const result = await client.getAnimal(testWord);

    expect(result).not.toBeUndefined();
  });
});

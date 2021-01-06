import { API_CLASS } from '@env';
import Pokemon from 'domain/models/Pokemon';
import AnimalsHttp from 'domain/services/AnimalsHttp';
import { getRandomInt } from 'utils/numberUtils';
import { sleep } from 'utils/testUtils';
import dogs from '../mock/dogs';
import pokemons from '../mock/pokemons';

const mocks = {
  POKEMON: pokemons,
  DOGS: dogs,
};

export default class MockAnimalsHttp implements AnimalsHttp {
  animals: Array<any>;

  constructor() {
    this.animals = [...mocks[API_CLASS]];
  }
  async getAnimals(page, itemsPerPage) {
    await sleep(350);
    const offset = (page - 1) * itemsPerPage;
    return this.animals.splice(offset, itemsPerPage);
  }

  async getAnimalByName(searchValue: string) {
    await sleep(350);
    const returnedArray = [...this.animals];
    return returnedArray.filter((animal: Pokemon) =>
      animal.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }

  async getAnimal(reference) {
    await sleep(350);
    return this.animals.find((animal: Pokemon) => {
      return animal.name.toLowerCase().includes(reference.toLowerCase());
    });
  }

  async getRandomAnimal() {
    await sleep(350);
    return this.animals[getRandomInt(0, this.animals.length)];
  }
}

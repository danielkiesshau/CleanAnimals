import Pokemon from '../../domain/models/Pokemon';
import AnimalsHttp from '../../domain/services/AnimalsHttp';
import { getRandomInt } from '../../utils/numberUtils';
import { sleep } from '../../utils/testUtils';
import pokemons from '../mock/pokemons';

export default class MockAnimalsHttp implements AnimalsHttp {
  animals: Pokemon[];
  constructor() {
    this.animals = [...pokemons];
  }

  async getAnimals(page, itemsPerPage) {
    await sleep(350);
    const offset = page * itemsPerPage;
    return this.animals.splice(offset, itemsPerPage);
  }

  async getAnimalByName(searchValue: string) {
    await sleep(350);
    return this.animals.filter((animal: Pokemon) =>
      animal.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }

  async getAnimal(reference) {
    await sleep(350);
    return this.animals.find((animal: Pokemon) =>
      animal.name.toLowerCase().includes(reference.toLowerCase()),
    );
  }

  async getRandomPokemon() {
    await sleep(350);
    return this.animals[getRandomInt(0, this.animals.length)];
  }
}

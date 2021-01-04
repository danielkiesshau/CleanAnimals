import AnimalsHttp from '../../domain/services/AnimalsHttp';

export default class DogsHttpService implements AnimalsHttp {
  getAnimals(page: number, itemsPerPage: number) {}
  getAnimalByName(searchValue: string, animals: any[]) {}
  getAnimal(ref: string, id?: string | undefined) {}
  getRandomAnimal() {}
}

import Pokemon from '../models/Pokemon';

export default interface AnimalsHttp {
  getAnimals: (page: number, itemsPerPage: number) => Promise<Pokemon[]>;
  getAnimalByName: (searchValue: string, animals: any[]) => Promise<Pokemon[]>;
  getAnimal: (ref: string, isEvolution?: boolean) => Promise<Pokemon | void>;
}

import Pokemon from 'domain/models/Pokemon';

export default interface AnimalsHttp {
  getAnimals: (page: number, itemsPerPage: number) => Promise<Pokemon[]>;
  getAnimalByName: (searchValue: string, animals: any[]) => Promise<Pokemon[]>;
  getAnimal: (ref: string, id?: string) => Promise<Pokemon | void>;
  getRandomPokemon: () => Promise<Pokemon>;
}

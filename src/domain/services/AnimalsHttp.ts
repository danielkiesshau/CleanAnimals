export default interface AnimalsHttp {
  getAnimals: (page: number, itemsPerPage: number) => Promise<any[]>;
  getAnimalByName: (searchValue: string, animals: any[]) => Promise<any[]>;
  getAnimal: (ref: string, id?: string) => Promise<any | void>;
  getRandomAnimal: () => Promise<any>;
}

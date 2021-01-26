import Dog from '../../domain/models/Dog';
import AnimalsHttp from '../../domain/services/AnimalsHttp';
import DogRest from '../../domain/services/DogAPI/types';
import HttpClient from '../../infra/http/HttpClient';

export default class DogsHttpService implements AnimalsHttp {
  animals: Dog[];
  client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
    this.animals = [];
  }

  async getAnimals(page: number, itemsPerPage: number) {
    const offset = (page - 1) * itemsPerPage;
    const response = await this.client.get('/images/search', {
      limit: itemsPerPage,
      offset: offset,
    });

    const dogs: Dog[] = response.data.map(this.mapDog).filter((d) => d.name);
    const removeDuplicates = [];

    return dogs.filter((dog) => {
      if (!removeDuplicates.includes(dog.name)) {
        removeDuplicates.push(dog.name);
        return true;
      }
      return false;
    });
  }

  async getAnimalByName(searchValue: string) {
    const dogResponse = await this.client.get('/breeds/search', {
      q: searchValue.toLocaleLowerCase(),
    });

    const getCompleteDogs = dogResponse.data.map((dogRest: DogRest) =>
      this.getAnimal(dogRest.id),
    );

    const dogs = await Promise.all(getCompleteDogs);
    return dogs.filter((d) => d);
  }

  async getAnimal(id: string) {
    const result = await this.client.get('/images/search', {
      breed_id: id,
    });

    return result.data.length > 0 ? this.mapDog(result.data[0]) : null;
  }

  async getRandomAnimal() {
    let response;

    while (
      (!response && !response?.data[0]?.breeds[0]?.name) ||
      !response?.data[0]
    ) {
      response = await this.client.get('/images/search', {
        limit: 1,
        offset: Math.round(Math.random() * 150),
      });
    }

    return this.mapDog(response?.data[0]);
  }

  mapDog(dogRest: DogRest) {
    const breed = dogRest.breeds[0];
    const dog: Dog = {
      id: dogRest.id,
      image: dogRest.url,
      breedGroup: breed?.breed_group || '',
      lifeSpan: breed?.life_span || '',
      name: breed?.name || '',
      temperament: breed?.temperament || '',
    };

    return dog;
  }
}

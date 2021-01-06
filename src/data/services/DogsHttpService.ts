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

    const m = response.data.map(this.mapDog).filter((d) => d.name);
    console.log('M', m);
    return m;
  }

  getAnimalByName() {}

  getAnimal() {}

  getRandomAnimal() {}

  mapDog(dogRest: DogRest) {
    console.log('DUREGS', dogRest);
    const breed = dogRest.breeds[0];
    const dog: Dog = {
      id: dogRest.id,
      image: dogRest.url,
      breedGroup: breed?.breed_group,
      lifeSpan: breed?.life_span,
      name: breed?.name,
      temperament: breed?.temperament,
    };

    return dog;
  }
}

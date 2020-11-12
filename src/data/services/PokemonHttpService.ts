import Pokemon, { Stats } from '../../domain/models/Pokemon';
import AnimalsHttp from '../../domain/services/AnimalsHttp';
import {
  MoveRest,
  PokemonRest,
  ResultMoveRest,
  ResultPokemonPagination,
  StatsRest,
  TypeRest,
} from '../../domain/services/pokeApI/types';
import HttpClient from '../../infra/http/HttpClient';
import { getRestResponse } from './utils/pokeApiUtils';

export default class PokemonHttpService implements AnimalsHttp {
  animals: Pokemon[];
  client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
    this.animals = [];
  }

  async getAnimals(page, itemsPerPage) {
    const offset = (page - 1) * itemsPerPage;
    let response;
    try {
      response = await this.client.get('pokemon/', {
        limit: itemsPerPage,
        offset: offset,
      });
    } catch (e) {
      console.log('error', e.toString());
    }

    let promissesGetAnimals: Promise<Pokemon | void>[] = [];
    const pokemonResults: ResultPokemonPagination = { ...response.data };

    pokemonResults.results.forEach((pokemon) => {
      return promissesGetAnimals.push(this.getAnimal(pokemon.url));
    });

    return Promise.all(promissesGetAnimals);
  }

  async getAnimalByName(searchValue: string, pokemonsParam: Pokemon[]) {
    return pokemonsParam.filter((animal: Pokemon) =>
      animal.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }

  async getAnimal(url: string) {
    const response = await getRestResponse(this.client, url);
    const pokemonRest: PokemonRest = response.data;

    const moves = await this.getMoves(pokemonRest.moves);
    const stats = this.getStats(pokemonRest.stats);
    const type = pokemonRest.types.map((t: TypeRest) => t.type.name);

    const pokemon: Pokemon = {
      id: pokemonRest.id.toString(),
      image: pokemonRest.sprites.front_default,
      name: pokemonRest.name,
      moves,
      stats,
      type,
      evolutions: pokemonRest.forms,
    };
    return pokemon;
  }

  async getMoves(moves: ResultMoveRest[]) {
    const movesPromisses = [];
    moves.map((ability: ResultMoveRest, index) => {
      if (index < 3) {
        movesPromisses.push(getRestResponse(this.client, ability.move.url));
      }
    });

    const movesResponses = await Promise.all(movesPromisses);
    return movesResponses.map((r: MoveResponse) => ({
      name: r.data.name || '',
      description: r.data?.effect_entries[0]?.effect || '',
    }));
  }

  getStats(statsRest: StatsRest[]) {
    const stats = new Stats();

    statsRest.map((r: StatsRest) => {
      stats[r.stat.name] = r.base_stat;
    });

    return stats;
  }
}

interface MoveResponse {
  data: MoveRest;
}

import Pokemon, { Stats } from '../../domain/models/Pokemon';
import AnimalsHttp from '../../domain/services/AnimalsHttp';
import {
  EvolutionsRest,
  MoveRest,
  PokemonRest,
  ResultMoveRest,
  ResultPokemonPagination,
  StatsRest,
  TypeRest,
} from '../../domain/services/pokeApI/types';
import HttpClient from '../../infra/http/HttpClient';
import { getRandomInt } from '../../utils/numberUtils';
import { dashToCamelCase } from '../../utils/stringUtils';
import {
  formatMoveDescription,
  getRestResponse,
  mapEvolutionsMap,
} from './utils/pokeApiUtils';

const MAX_MOVES = 5;
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

  async getAnimal(url?: string, id?: string) {
    const response = await (id
      ? this.client.get(`pokemon/${id}`)
      : getRestResponse(this.client, url));
    const pokemonRest: PokemonRest = response.data;

    const moves = await this.getMoves(pokemonRest.moves);
    const stats = this.getStats(pokemonRest.stats);
    const type = pokemonRest.types.map((t: TypeRest) => t.type.name);

    const pokemon: Pokemon = {
      id: pokemonRest.id.toString(),
      image: pokemonRest.sprites.front_default,
      shinyImage: pokemonRest.sprites.front_shiny,
      name: pokemonRest.name,
      moves,
      stats,
      type,
    };
    return pokemon;
  }

  async getMoves(moves: ResultMoveRest[]) {
    const movesPromisses: Promise<MoveResponse>[] = [];
    let randomMin = getRandomInt(moves.length - MAX_MOVES, 0, true);
    moves.map((ability: ResultMoveRest, index) => {
      if (
        index + MAX_MOVES >= randomMin &&
        this.haveMaxMoves(index, randomMin, movesPromisses.length)
      ) {
        movesPromisses.push(getRestResponse(this.client, ability.move.url));
      }
    });
    const movesResponses = await Promise.all(movesPromisses);
    return movesResponses.map((r) => ({
      name: r.data.name || '',
      description: formatMoveDescription(
        r.data?.effect_entries[0]?.effect,
        r.data?.effect_chance || '',
      ),
    }));
  }
  haveMaxMoves = (
    index: number,
    randomMin: number,
    currentLength: number,
    maxMoves = MAX_MOVES,
  ) => index <= randomMin && currentLength < maxMoves;

  getStats(statsRest: StatsRest[]) {
    const stats = new Stats();
    statsRest.map((r: StatsRest) => {
      stats[dashToCamelCase(r.stat.name)] = r.base_stat;
    });
    return stats;
  }

  async getEvolutions(id: string): Promise<string[]> {
    const result: EvolutionsResponse = await this.client.get(
      `evolution-chain/${id}`,
    );

    return mapEvolutionsMap(result.data);
  }
}

interface MoveResponse {
  data: MoveRest;
}
interface EvolutionsResponse {
  data: EvolutionsRest;
}

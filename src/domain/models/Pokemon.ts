import { ResultPokemonRest } from '../services/pokeApI/types';

export default interface Pokemon {
  id: string;
  name: string;
  image: string;
  type: string[];
  stats: Stats;
  moves: Move[];
  evolutions: ResultPokemonRest[];
}

export type Move = {
  name: string;
  description: string;
};

export class Stats {
  hp: number = 0;
  attack: number = 0;
  defense: number = 0;
  specialAttack: number = 0;
  specialDefense: number = 0;
  speed: number = 0;
}

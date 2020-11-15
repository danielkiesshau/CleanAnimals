export default interface Pokemon {
  id: string;
  name: string;
  image: string;
  shinyImage: string;
  type: string[];
  stats: Stats;
  moves: Move[];
  evolutions?: string[];
}

export type Move = {
  name: string;
  description: string;
};

export class Stats {
  hp: number | string = 0;
  attack: number | string = 0;
  defense: number | string = 0;
  specialAttack: number | string = 0;
  specialDefense: number | string = 0;
  speed: number | string = 0;
}

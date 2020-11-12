export type ResultPokemonRest = {
  name: string;
  url: string;
};

export type ResultPokemonPagination = {
  count: number;
  next: string;
  previous: string;
  results: ResultPokemonRest[];
};

export type ResultMoveRest = {
  move: ResultPokemonRest;
};

export type PokemonRest = {
  id: string;
  name: string;
  forms: ResultPokemonRest[];
  moves: ResultMoveRest[];
  sprites: SpritesRest;
  stats: StatsRest[];
  types: TypeRest[];
};

export type TypeRest = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type StatsRest = {
  base_stat: number;
  stat: {
    name: string;
    url: string;
  };
};

export type SpritesRest = {
  front_default: string;
};

export type MoveRest = {
  name: string;
  effect_entries: EffectEntryRest[];
};

export type EffectEntryRest = {
  effect: string;
};

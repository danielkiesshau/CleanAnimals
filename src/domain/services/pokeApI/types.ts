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
  forms: EvolutionsRest;
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
  front_shiny: string;
};

export type MoveRest = {
  name: string;
  effect_entries: EffectEntryRest[];
  effect_chance: string | null;
};

export type EffectEntryRest = {
  effect: string;
};

export type EvolutionsRest = {
  chain: EvolutionRest;
};

export type EvolutionRest = {
  evolves_to: [
    {
      evolves_to: EvolutionRest[];
      species: ResultPokemonRest;
    },
  ];
};

import type Pokemon from '../../domain/models/Pokemon';

const pokemons: Pokemon[] = [
  {
    name: 'sparrow',
    id: 'sparrow',
    shinyImage:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/21.png',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/21.png',
    type: ['normal', 'flying'],
    stats: {
      hp: 40,
      attack: 60,
      defense: 30,
      specialAttack: 31,
      specialDefense: 31,
      speed: 70,
    },
    moves: [
      {
        name: 'razor-wind',
        description:
          "Inflicts regular damage. User's critical hit rate is one level higher when using this move. User charges for one turn before attacking. This move cannot be selected by sleep talk.",
      },
      {
        name: 'fly',
        description:
          "swift can hit the user while in the air, and no other moves can. Due to a bug, if the user fails to carry out the move's second turn, e.g. due to paralysis, it remains in the air until it switches out or uses Fly again successfully. It can act as if it were on the ground in the meantime, but moves still miss",
      },
    ],
  },
  {
    name: 'pikachu',
    id: 'pikachu',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    shinyImage:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/25.png',
    type: ['electric'],
    stats: {
      hp: 35,
      attack: 55,
      defense: 40,
      specialAttack: 50,
      specialDefense: 50,
      speed: 90,
    },
    moves: [
      {
        name: 'mega-punch',
        description: 'Inflicts regular damage with no additional effect.',
      },
      {
        name: 'thunder-shock',
        description:
          'Inflicts regular damage. Has a $effect_chance% chance to paralyze the target.',
      },
    ],
  },
  {
    name: 'nidorino',
    id: 'nidorino',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/33.png',
    shinyImage:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/33.png',
    type: ['poison'],
    stats: {
      hp: 61,
      attack: 72,
      defense: 67,
      specialAttack: 55,
      specialDefense: 55,
      speed: 65,
    },
    moves: [
      {
        name: 'double-kick',
        description: 'Inflicts regular damage. Hits twice in one turn.',
      },
      {
        name: 'horn-attack',
        description: 'Inflicts regular damage.',
      },
    ],
  },
  {
    name: 'vulpix',
    id: 'vulpix',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/37.png',
    shinyImage:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/37.png',
    type: ['fire'],
    stats: {
      hp: 38,
      attack: 41,
      defense: 40,
      specialAttack: 50,
      specialDefense: 65,
      speed: 65,
    },
    moves: [
      {
        name: 'body-slam',
        description:
          'Inflicts regular damage. Has a $effect_chance% chance to paralyze the target.',
      },
      {
        name: 'ember',
        description:
          'Inflicts regular damage. Has a $effect_chance% chance to burn the target.',
      },
    ],
  },
  {
    name: 'jigglypuff',
    id: 'jigglypu',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png',
    shinyImage:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/39.png',
    type: ['normal', 'fairy'],
    stats: {
      hp: 115,
      attack: 45,
      defense: 20,
      specialAttack: 45,
      specialDefense: 25,
      speed: 20,
    },
    moves: [
      {
        name: 'sing',
        description: 'Puts the target to sleep.',
      },
      {
        name: 'flamethrower',
        description:
          'Inflicts regular damage. Has a $effect_chance% chance to burn the target',
      },
    ],
  },
];

export default pokemons;

import HttpClient from 'infra/http/HttpClient';
import { EvolutionsRest } from 'domain/services/pokeApI/types';

export const getEndPoint = (url: string) => {
  return url.split('https://pokeapi.co/api/v2/')[1];
};

export const getRestResponse = async (client: HttpClient, url: string) => {
  const endpoint = getEndPoint(url);
  return client.get(endpoint);
};

enum TypeColor {
  normal = '#9998A9',
  flying = '#8DA0EF',
  grass = '#6ABC2F',
  poison = '#843B86',
  water = '#3292F3',
  steel = '#9998A9',
  fire = '#ED410A',
  ground = '#CFAC53',
  fairy = '#F1ACF1',
  fighting = '#80341C',
  psychic = '#EA457F',
  rock = '#B49D52',
  electric = '#FEB816',
  ice = '#6DD4F4',
  ghost = '#353476',
  bug = '#89970D',
  dark = '#4F3B2D',
  dragon = '#755FDF',
}

export const getTypeColor = (type): string => {
  return TypeColor[type] || TypeColor.normal;
};

export const formatMoveDescription = (move: string, effectChance: string) => {
  return move.replace('$effect_chance', effectChance).replace(/-/g, '') || '';
};

export const mapEvolutionsMap = (evolutions: EvolutionsRest) => {
  let evos: string[] = [];

  if (evolutions.chain.evolves_to.length > 0) {
    evolutions.chain.evolves_to.forEach((e) => {
      evos.push(e.species.name);
      evos = mapRecursiveEvolution(e, evos);
    });
  }

  return evos;
};

const mapRecursiveEvolution = (evolution, evolutions: string[]) => {
  if (evolution.evolves_to.length > 0) {
    let childEvos = mapEvolutionsMap({
      chain: { evolves_to: evolution.evolves_to },
    });
    return [...evolutions, ...childEvos];
  }

  return evolutions;
};

export const TOTAL_AVAILABLE_POKEMONS = 890;

export const POKE_BASE_URL = 'https://pokeapi.co/api/v2/';

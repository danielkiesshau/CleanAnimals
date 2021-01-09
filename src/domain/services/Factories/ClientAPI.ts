import { API_BASE_URL, API_CLASS, IS_MOCK_API } from '@env';
import { createContext } from 'react';
import DogsHttpService from '../../../data/services/DogsHttpService';
import MockAnimalsHttp from '../../../data/services/MockAnimalsHttp';
import PokemonHttpService from '../../../data/services/PokemonHttpService';
import AxiosHttpClient from '../../../infra/http/AxiosHttpClient';
import HttpClient from '../../../infra/http/HttpClient';
import AnimalsHttp from '../AnimalsHttp';

const clients = {
  POKEMON: PokemonHttpService,
  DOG: DogsHttpService,
  MOCK: MockAnimalsHttp,
};

export enum ClientAPITypes {
  POKEMON = 'POKEMON',
  DOG = 'DOG',
}

export class ClientAPI {
  static shared: HttpClient;
  static isMock: boolean;
  static type: ClientAPITypes;

  static create() {
    return ClientAPI.shared || ClientAPI.factoryClientAPI();
  }

  static factoryClientAPI() {
    const Service = clients[ClientAPI.isMock ? 'MOCK' : ClientAPI.type];
    ClientAPI.shared = new Service(new AxiosHttpClient(API_BASE_URL));
    return ClientAPI.shared;
  }
}

const factoryClientAPI = (isMock: boolean, type: ClientAPITypes) => {
  ClientAPI.isMock = JSON.parse(isMock);
  ClientAPI.type = type;
  ClientAPI.create();
  return ClientAPI.shared;
};

export default factoryClientAPI;

type ClientAPIContext = {
  client: AnimalsHttp;
  setClientAPI: Function;
};

export const ContextClientAPI = createContext<ClientAPIContext>({
  client: factoryClientAPI(IS_MOCK_API, API_CLASS),
  setClientAPI: () => {},
});

import HttpClient from './HttpClient';
import axios, { AxiosInstance } from 'axios';

export default class AxiosHttpClient implements HttpClient {
  client: AxiosInstance;
  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
    });
  }

  get = async (endpoint, params) => {
    return this.client.get(endpoint, {
      params,
    });
  };
}

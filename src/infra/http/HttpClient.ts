export type GetParams = {
  endpoint: string;
  params?: object | undefined;
};

export default interface HttpClient {
  get: (endpoint: string, params?: object) => Promise<IResponse | any>;
}

export interface IResponse extends Response {
  data: Array<any>;
}

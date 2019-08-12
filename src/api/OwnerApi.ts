import Axios, { AxiosInstance } from 'axios';
import { SalesmanListItem } from './types';

export class OwnerApi {
  private api: AxiosInstance;

  constructor(baseUrl: string, token: string) {
    this.api = Axios.create({
      baseURL: `${baseUrl}`,
      headers: {
        authorization: `bearer ${token}`
      }
    });
  }

  public getList() {
    return this.api.get<SalesmanListItem[]>('/api/owner/salesman/list');
  }
}

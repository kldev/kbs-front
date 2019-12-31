//import Axios, { AxiosInstance } from 'axios';
import { SalesmanListItem } from './types';
import { Cerber } from '../service/Cerber';

export class OwnerApi {
  private _token: string;

  constructor(token: string) {
    this._token = token;
  }

  public getList = async (): Promise<SalesmanListItem[]> => {
    const result = await Cerber.getInstance().callProxy('/api/owner/salesman/list', '', 'get', this._token);

    if (result && result.length > 0) {
      return JSON.parse(result) as SalesmanListItem[];
    }

    return [];
  };
}

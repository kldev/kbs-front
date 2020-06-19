import Axios, { AxiosInstance } from 'axios';
import { SalesmanListItem } from './types';
// import { Cerber } from '../service/Cerber';
const BaseUrl = `${process.env.REACT_APP_BASE_API}`;
export class OwnerApi {
  private _token: string;

  private api: AxiosInstance;

  constructor(token: string) {
    this._token = token;

    this.api = Axios.create({
      baseURL: `${BaseUrl}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  public getList = async (): Promise<SalesmanListItem[]> => {
    // const result = await Cerber.getInstance().callProxy('/api/owner/salesman/list', '', 'get', this._token);
    const { data } = await this.api.get<SalesmanListItem[]>('/api/owner/salesman/list');

    if (data && data.length > 0) {
      return data;
    }

    return [];
  };
}

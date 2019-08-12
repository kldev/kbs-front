import Axios, { AxiosInstance } from 'axios';
import { AuthRequest, AuthResponse } from './types';

const BaseUrl = `${process.env.REACT_APP_BASE_API}`;

class AuthApi {
  private api: AxiosInstance;

  constructor(private baseUrl: string) {
    this.api = Axios.create({
      baseURL: `${baseUrl}`,
      headers: {}
    });
  }

  public login(auth: AuthRequest) {
    return this.api.post<AuthResponse>('/api/authorize', auth);
  }
}

export const authApi = new AuthApi(BaseUrl);

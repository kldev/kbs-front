import { AuthResponse } from 'api/types';

export interface IAppState {
  token: string;
  role: string;
  username: string;
  errorMessage: { id: string; value: string }[];
  loginState: LoginStates;
}

export enum LoginStates {
  idle = 0,
  inProgress = 1,
  failed = 2,
  success = 3
}

export interface LoginSuccessModel extends AuthResponse {
  username: string;
}

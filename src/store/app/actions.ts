import { LoginStates, LoginSuccessModel } from './types';
import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('app');

export const logout = actionCreator('logout');
export const setLoginState = actionCreator<LoginStates>('setLoginState');
export const addError = actionCreator<string>('addError');
export const dismissError = actionCreator<{ id: string; value: string }>('dismissError');
export const loginSuccess = actionCreator<LoginSuccessModel>('loginSuccess');

import { ThunkAction } from 'redux-thunk';
import { AppState } from 'store';

import { addError, setLoginState, loginSuccess } from 'store/app/actions';
import { authApi } from 'api/AuthApi';
import { LoginStates, LoginSuccessModel } from './types';
import { AuthRequest } from 'api/types';
import { Action } from 'redux';

export type thunkLoginResult = ThunkAction<void, AppState, null, Action>;

export const thunkLogin = (model: AuthRequest): thunkLoginResult => async dispatch => {
  if (!model.username || !model.password) {
    dispatch(setLoginState(LoginStates.failed));
    dispatchErrorAndReset(dispatch, 'Username / password can not be empty');
  }

  dispatch(setLoginState(LoginStates.inProgress));

  try {
    const result = await authApi.login(model);

    if (result.status === 200) {
      const success: LoginSuccessModel = { ...result.data, username: model.username };

      dispatch(loginSuccess(success));
      dispatch(setLoginState(LoginStates.success));
      return;
    }
  } catch (err) {
    console.log('Catch error:', err);
  }

  dispatchErrorAndReset(dispatch, 'login or password invalid');
  dispatch(setLoginState(LoginStates.failed));
};

const dispatchErrorAndReset = (dispatch: any, message: string) => {
  console.log('Set error');
  dispatch(addError(message));
};

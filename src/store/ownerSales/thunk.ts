import { OwnerApi } from 'api/OwnerApi';

import { ThunkAction } from 'redux-thunk';
import { AppState } from 'store';
import { listSuccess } from './actions';
import { Action } from 'redux';

export type thunkResult = ThunkAction<void, AppState, null, Action>;

export const getList = (): thunkResult => async (dispatch, state) => {
  const ownerApi = new OwnerApi(state().app.token);

  const list = await ownerApi.getList();
  dispatch(listSuccess(list));
};

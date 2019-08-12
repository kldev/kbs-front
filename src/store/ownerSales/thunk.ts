import { Urls } from 'constant/Urls';
import { OwnerApi } from 'api/OwnerApi';

import { ThunkAction } from 'redux-thunk';
import { AppState } from 'store';
import { listSuccess } from './actions';
import { Action } from 'redux';

export type thunkResult = ThunkAction<void, AppState, null, Action>;

export const getList = (): thunkResult => async (dispatch, state) => {
  const ownerApi = new OwnerApi(Urls.BaseUrl, state().app.token);

  try {
    const list = await ownerApi.getList();

    if (list.status === 200) {
      dispatch(listSuccess(list.data));
      return;
    }
  } catch {}
  dispatch(listSuccess([]));
};

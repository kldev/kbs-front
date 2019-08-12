import { IOwnerSalesState } from './types';
import { Action } from 'redux';
import { isType } from 'typescript-fsa';
import * as actions from './actions';

const ownerSalesState: IOwnerSalesState = {
  list: []
};

const assignState = (state: IOwnerSalesState, change: Partial<IOwnerSalesState> = {}): IOwnerSalesState => {
  return Object.assign({}, state, change);
};

export function ownerSalesReducer(state = ownerSalesState, action: Action): IOwnerSalesState {
  if (isType(action, actions.listSuccess)) {
    const list = action.payload;
    return assignState(state, { list });
  }

  return state;
}

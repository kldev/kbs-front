import { IFilterState } from './types';
import { Action } from 'redux';
import { isType } from 'typescript-fsa';
import * as actions from './actions';

export const initialFilterState: IFilterState = {
  visible: false
};

export function navReducer(state = initialFilterState, action: Action): IFilterState {
  if (isType(action, actions.setFilterVisibility)) {
    return Object.assign({}, state, { visible: action.payload });
  }

  if (isType(action, actions.toggleFilter)) {
    return Object.assign({}, state, { visible: !state.visible });
  }

  return state;
}

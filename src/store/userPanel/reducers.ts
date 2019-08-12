import { Action } from 'redux';
import { isType } from 'typescript-fsa';
import * as actions from './actions';
import { IUserPanelState } from './types';

const userPanelState: IUserPanelState = {
  showPassword: false,
  showProfile: false
};

const assignState = (state: IUserPanelState, change: Partial<IUserPanelState> = {}): IUserPanelState => {
  return Object.assign({}, state, change);
};

export function userPanelReducer(state = userPanelState, action: Action): IUserPanelState {
  if (isType(action, actions.setPasswordPanelVisible)) {
    return assignState(state, { showPassword: action.payload });
  }

  if (isType(action, actions.setProfilePanelVisible)) {
    return assignState(state, { showProfile: action.payload });
  }

  return state;
}

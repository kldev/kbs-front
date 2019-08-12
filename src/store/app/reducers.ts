import { Action } from 'redux';
import { isType } from 'typescript-fsa';
import * as actions from './actions';
import { IAppState, LoginStates } from './types';

const appState: IAppState = {
  errorMessage: [],
  token: '',
  role: '',
  username: '',
  loginState: LoginStates.idle
};

if (window.sessionStorage) {
  let authPayload = window.sessionStorage.getItem('kbs-app');
  if (authPayload) {
    appState.username = JSON.parse(authPayload).username;
    appState.token = JSON.parse(authPayload).token;
    appState.role = JSON.parse(authPayload).role;
  }
}

const assignState = (state: IAppState, change: Partial<IAppState> = {}): IAppState => {
  return Object.assign({}, state, change);
};

export function appReducer(state = appState, action: Action): IAppState {
  if (isType(action, actions.loginSuccess)) {
    const { username, token, role } = action.payload;

    if (window.sessionStorage) {
      window.sessionStorage.setItem('kbs-app', JSON.stringify({ username, token, role }));
    }

    return assignState(state, { username, token, role });
  }

  if (isType(action, actions.logout)) {
    if (window.sessionStorage) {
      window.sessionStorage.clear();
    }
    return assignState(appState);
  }

  if (isType(action, actions.addError)) {
    const errorMessage = action.payload;

    return assignState(state, {
      errorMessage: [{ id: `${state.errorMessage.length}`, value: errorMessage }, ...state.errorMessage]
    });
  }

  if (isType(action, actions.dismissError)) {
    const index = action.payload as any;
    const messages = [...state.errorMessage].filter(x => x.id !== index.id);

    return assignState(state, { errorMessage: messages });
  }

  if (isType(action, actions.setLoginState)) {
    const loginState = action.payload;

    return assignState(state, { loginState });
  }

  return state;
}

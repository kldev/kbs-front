import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { appReducer } from './app/reducers';
import { ownerSalesReducer } from './ownerSales/reducers';
import { navReducer } from './nav/reducers';
import { userPanelReducer } from './userPanel/reducers';

/// combine reducers in root tree
const rootReducer = combineReducers({
  app: appReducer,
  ownerSales: ownerSalesReducer,
  nav: navReducer,
  userPanel: userPanelReducer
});

export type AppState = ReturnType<typeof rootReducer>; // create type base on object

/// here u configure store
export default function configureStore() {
  const middlewares = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(rootReducer, composeWithDevTools(middleWareEnhancer));

  return store;
}

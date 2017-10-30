import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { makeRootReducer, AsyncStore } from './reducers';
import { History } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { State } from './types';
import { loadState, saveState } from './storage';
import { Dependencies } from './dependencies';

const createStateStore = (history: History, dependencies: Dependencies, initialState: State = loadState() || {}) => {
  const enhancers = applyMiddleware(thunk.withExtraArgument(dependencies), routerMiddleware(history));
  const devToolsCompose = (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  const composeEnhancers = devToolsCompose ? devToolsCompose({}) : compose;
  const store: AsyncStore<State> = createStore<State>(
    makeRootReducer(),
    initialState,
    composeEnhancers(enhancers)
  );
  store.asyncReducers = {};
  // store.subscribe(() => {
    // const { login } = store.getState();
    // saveState({ login });
  // });
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').makeRootReducer;
      store.replaceReducer(reducers(store.asyncReducers));
    })
  }
  return store;
};

export { createStateStore as createStore };


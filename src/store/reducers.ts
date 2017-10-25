import { combineReducers, Reducer, Store } from 'redux';
import { State, Handlers } from './types';

export const makeRootReducer = (asyncReducers?: Handlers<State>) => {
  return combineReducers({
  }) as Reducer<State>;
}

export interface ReduerRegistration {
  key: string;
  reducer: Reducer<State>;
}

export interface AsyncStore<S> extends Store<S> {
  asyncReducers?: Handlers<S>;
}

export const injectReducer = (store: AsyncStore<State>, { key, reducer }: ReduerRegistration) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;
  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
}

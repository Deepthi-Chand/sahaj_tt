import { combineReducers as reduxCombineReducers, Reducer, Store } from 'redux';
import { State, Handlers, ReducersMapObject } from './types';
import { reducer as matches } from '../routes/Matches/modules/matches';
import { reducer as registrations } from '../routes/Registrations/modules/registrations';

const combineReducers = (reducers: ReducersMapObject): Reducer<State> =>
  reduxCombineReducers(reducers);

export const makeRootReducer = (asyncReducers?: Handlers<State>) =>
  combineReducers({
    matches,
    registrations
  });

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

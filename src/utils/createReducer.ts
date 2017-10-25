import { Action, Reducer as ReduxReducer } from 'redux';

export interface Handlers<S> {
  [action_type: string]: ReduxReducer<S>;
};
export interface ParentState<S> {
  [state_key: string]: S;
};
interface Reducer<S, A extends Action> {
  (state: S, action: A): S;
};

const defaultHandler = <S>(state: S) => state;

export const createReducer = <S>(handlers: Handlers<S>, initialState: S) =>
  (state = initialState, action: Action) =>
    [action]
      .map(action => action.type)
      .map(type => handlers[type] || defaultHandler)
      .map(handler => handler(state, action))
      .shift();

export const createSliceReducer = <S, P>(handlers: Handlers<P>, initialState: P, selector: keyof S): ReduxReducer<S> =>
  (state: S, action: Action) =>
    [action]
      .map(action => action.type)
      .map(type => handlers[type] || defaultHandler)
      .map(handler => {
        const parentState = (<any>state) as ParentState<P>;
        return (<any>{
          ...parentState,
          [selector]: handler(parentState[selector] == undefined ? initialState : parentState[selector], action)
        }) as S;
      })
      .shift();

export const addReducer = <S, A extends Action>(handlers: Handlers<S>, action_type: string, reducer: Reducer<S, A>) => { handlers[action_type] = reducer; };

export const mixReducers = <S>(...reducers: ReduxReducer<S>[]) =>
  (state:S, action: Action) => reducers.reduce((state, reducer) => reducer(state, action), state);

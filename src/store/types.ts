import { Dispatch as DispatchBase, Action as ActionBase, Reducer } from 'redux';


export interface State {
}

export interface GetState {
  (): State;
};

export interface Dispatch extends DispatchBase<State> {
};

export interface Action extends ActionBase {
  type: string;
}

export interface Handlers<TState> {
  [action_type: string]: Reducer<TState>;
};

import { Dispatch as DispatchBase, Action as ActionBase, Reducer } from 'redux';
import { IHaveMatchesState } from '../routes/Matches/modules/matches';
import { IHaveRegistrationsState } from '../routes/Registrations/modules/registrations';
import { IHaveAuthenticationState } from '../modules/authentication';
import { Api } from "api";

export interface State
  extends
  IHaveMatchesState,
  IHaveRegistrationsState,
  IHaveAuthenticationState {
}

export type Dispatch = DispatchBase<State>;

export interface GetState {
  (): State;
};

export interface Dependencies {
  api: Api;
}

export interface Action<T> extends ActionBase {
  type: T;
}

export interface Handlers<TState> {
  [action_type: string]: Reducer<TState>;
};

export type ReducersMapObject = {
  [K in keyof State]: Reducer<any>;
}

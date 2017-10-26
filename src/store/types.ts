import { Dispatch as DispatchBase, Action as ActionBase, Reducer } from 'redux';
import { IHaveMatchesState } from '../routes/Matches/modules/matches';
import { IHaveRegistrationsState } from '../routes/Registrations/modules/registrations';


export interface State extends IHaveMatchesState,
  IHaveRegistrationsState
{
}

export interface GetState {
  (): State;
};

export interface Dispatch extends DispatchBase<State> {
};

export interface Action<T> extends ActionBase {
  type: T;
}

export interface Handlers<TState> {
  [action_type: string]: Reducer<TState>;
};

export type ReducersMapObject = {
  [K in keyof State]: Reducer<any>;
}

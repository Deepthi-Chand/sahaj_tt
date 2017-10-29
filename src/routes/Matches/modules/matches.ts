import { Match, matches } from "../../../api";
import { Action, Dispatch, GetState } from "../../../store/types";
import { Handlers, addReducer, createReducer } from "../../../utils/createReducer";
import * as Promise from 'bluebird';

export interface MatchesState {
  items: Match[];
  is_loading: boolean;
}

export interface IHaveMatchesState {
  matches?: MatchesState;
}

const FETCH_MATCHES_REQUESTED = '$$MATCHES/FETCH_MATCHES_REQUESTED';
type FETCH_MATCHES_REQUESTED = '$$MATCHES/FETCH_MATCHES_REQUESTED';
const FETCH_MATCHES_SUCCESS = '$$MATCHES/FETCH_MATCHES_SUCCESS';
type FETCH_MATCHES_SUCCESS = '$$MATCHES/FETCH_MATCHES_SUCCESS';
const FETCH_MATCHES_FAILURE = '$$MATCHES/FETCH_MATCHES_FAILURE';
type FETCH_MATCHES_FAILURE = '$$MATCHES/FETCH_MATCHES_FAILURE';

interface FetchMatchesRequestedAction extends Action<FETCH_MATCHES_REQUESTED> {
}
interface FetchMatchesSuccessAction extends Action<FETCH_MATCHES_SUCCESS> {
  matches: Match[];
}
interface FetchMatchesFailureAction extends Action<FETCH_MATCHES_FAILURE> {
}

const fetchMatchesRequested = (): FetchMatchesRequestedAction => ({ type: FETCH_MATCHES_REQUESTED });
const fetchMatchesSuccess = (matches: Match[]): FetchMatchesSuccessAction => ({ type: FETCH_MATCHES_SUCCESS, matches });
const fetchMatchesFailure = (): FetchMatchesFailureAction => ({ type: FETCH_MATCHES_FAILURE });

export const fetchMatches = () =>
  (dispatch: Dispatch, getState: GetState) => {
    dispatch(fetchMatchesRequested());
    const { matches: { items } } = getState();
    return items.length > 0
      ? Promise.resolve(dispatch(fetchMatchesSuccess(items)))
      : matches.get()
        .then(matches => dispatch(fetchMatchesSuccess(matches)))
        .catch(reason => dispatch(fetchMatchesFailure()));
  };

const handlers: Handlers<MatchesState> = {};
addReducer(handlers, FETCH_MATCHES_REQUESTED, (state, action: FetchMatchesRequestedAction) => ({ ...state, is_loading: true }));
addReducer(handlers, FETCH_MATCHES_SUCCESS, (state, { matches: items }: FetchMatchesSuccessAction) => ({ ...state, items, is_loading: false }));
addReducer(handlers, FETCH_MATCHES_FAILURE, (state, action: FetchMatchesFailureAction) => ({ ...state, is_loading: false }));

const initialState: MatchesState = {
  items: [],
  is_loading: false
};

export const reducer = createReducer(handlers, initialState);

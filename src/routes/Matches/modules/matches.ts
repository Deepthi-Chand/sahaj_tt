import { Match } from "api";
import { Action, Dispatch, GetState, Dependencies } from "store/types";
import { Handlers, addReducer, createReducer } from "utils/createReducer";
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
const UPDATE_MATCH_RESULT_REQUESTED = '$$MATCHES/UPDATE_MATCH_RESULT_REQUESTED';
type UPDATE_MATCH_RESULT_REQUESTED = '$$MATCHES/UPDATE_MATCH_RESULT_REQUESTED';
const UPDATE_MATCH_RESULT_SUCCESS = '$$MATCHES/UPDATE_MATCH_RESULT_SUCCESS';
type UPDATE_MATCH_RESULT_SUCCESS = '$$MATCHES/UPDATE_MATCH_RESULT_SUCCESS';
const UPDATE_MATCH_RESULT_FAILURE = '$$MATCHES/UPDATE_MATCH_RESULT_FAILURE';
type UPDATE_MATCH_RESULT_FAILURE = '$$MATCHES/UPDATE_MATCH_RESULT_FAILURE';
const CONFIRM_MATCH_RESULT_REQUESTED = '$$MATCHES/CONFIRM_MATCH_RESULT_REQUESTED';
type CONFIRM_MATCH_RESULT_REQUESTED = '$$MATCHES/CONFIRM_MATCH_RESULT_REQUESTED';
const CONFIRM_MATCH_RESULT_SUCCESS = '$$MATCHES/CONFIRM_MATCH_RESULT_SUCCESS';
type CONFIRM_MATCH_RESULT_SUCCESS = '$$MATCHES/CONFIRM_MATCH_RESULT_SUCCESS';
const CONFIRM_MATCH_RESULT_FAILURE = '$$MATCHES/CONFIRM_MATCH_RESULT_FAILURE';
type CONFIRM_MATCH_RESULT_FAILURE = '$$MATCHES/CONFIRM_MATCH_RESULT_FAILURE';

interface FetchMatchesRequestedAction extends Action<FETCH_MATCHES_REQUESTED> {
}
interface FetchMatchesSuccessAction extends Action<FETCH_MATCHES_SUCCESS> {
  matches: Match[];
}
interface FetchMatchesFailureAction extends Action<FETCH_MATCHES_FAILURE> {
}
interface UpdateMatchResultRequestedAction extends Action<UPDATE_MATCH_RESULT_REQUESTED> {
}
interface UpdateMatchResultSuccessAction extends Action<UPDATE_MATCH_RESULT_SUCCESS> {
  match: Match;
}
interface UpdateMatchResultFailureAction extends Action<UPDATE_MATCH_RESULT_FAILURE> {
}
interface ConfirmMatchResultRequestedAction extends Action<CONFIRM_MATCH_RESULT_REQUESTED> {
}
interface ConfirmMatchResultSuccessAction extends Action<CONFIRM_MATCH_RESULT_SUCCESS> {
  match: Match;
}
interface ConfirmMatchResultFailureAction extends Action<CONFIRM_MATCH_RESULT_FAILURE> {
}

const fetchMatchesRequested = (): FetchMatchesRequestedAction => ({ type: FETCH_MATCHES_REQUESTED });
const fetchMatchesSuccess = (matches: Match[]): FetchMatchesSuccessAction => ({ type: FETCH_MATCHES_SUCCESS, matches });
const fetchMatchesFailure = (): FetchMatchesFailureAction => ({ type: FETCH_MATCHES_FAILURE });
const updateMatchResultRequested = (): UpdateMatchResultRequestedAction => ({ type: UPDATE_MATCH_RESULT_REQUESTED });
const updateMatchResultSuccess = (match: Match): UpdateMatchResultSuccessAction => ({ type: UPDATE_MATCH_RESULT_SUCCESS, match });
const updateMatchResultFailure = (): UpdateMatchResultFailureAction => ({ type: UPDATE_MATCH_RESULT_FAILURE });
const confirmMatchResultRequested = (): ConfirmMatchResultRequestedAction => ({ type: CONFIRM_MATCH_RESULT_REQUESTED });
const confirmMatchResultSuccess = (match: Match): ConfirmMatchResultSuccessAction => ({ type: CONFIRM_MATCH_RESULT_SUCCESS, match });
const confirmMatchResultFailure = (): ConfirmMatchResultFailureAction => ({ type: CONFIRM_MATCH_RESULT_FAILURE });

export const updateMatchResult = (match: Match, won: boolean) =>
  (dispatch: Dispatch, getState: GetState, { api: { matches } }: Dependencies) => {
    dispatch(updateMatchResultRequested());
    const { authentication: { email } } = getState();
    const { team_one, team_two } = match;
    const winner =
      team_one.player_one.email === email
        ? won ? team_one : team_two
        : won ? team_two : team_one;
    return matches.updateWinner(match, winner)
      .then(match => dispatch(updateMatchResultSuccess(match)))
      .catch(() => dispatch(updateMatchResultFailure()));
  };

export const confirmMatchResult = (match: Match, confirmed: boolean) =>
  (dispatch: Dispatch, getState: GetState, { api: { matches } }: Dependencies) => {
    dispatch(confirmMatchResultRequested());
    return matches.confirmWinner(match, confirmed)
      .then(match => dispatch(confirmMatchResultSuccess(match)))
      .catch(() => dispatch(confirmMatchResultFailure()));
  };

export const fetchMatches = () =>
  (dispatch: Dispatch, getState: GetState, { api: { matches } }: Dependencies) => {
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
addReducer(handlers, UPDATE_MATCH_RESULT_SUCCESS, (state, { match }: UpdateMatchResultSuccessAction) => ({ ...state, items: state.items.map(m => m.id === match.id ? match : m) }));
addReducer(handlers, CONFIRM_MATCH_RESULT_SUCCESS, (state, { match }: UpdateMatchResultSuccessAction) => ({ ...state, items: state.items.map(m => m.id === match.id ? match : m) }));

const initialState: MatchesState = {
  items: [],
  is_loading: false
};

export const reducer = createReducer(handlers, initialState);

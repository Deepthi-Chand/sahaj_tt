import { Action, Dispatch, GetState } from "store/types";
import { Match, matches } from "api";


const UPDATE_MATCH_RESULT_REQUESTED = '$$PROFILE/UPDATE_MATCH_RESULT_REQUESTED';
type UPDATE_MATCH_RESULT_REQUESTED = '$$PROFILE/UPDATE_MATCH_RESULT_REQUESTED';
const UPDATE_MATCH_RESULT_SUCCESS = '$$PROFILE/UPDATE_MATCH_RESULT_SUCCESS';
type UPDATE_MATCH_RESULT_SUCCESS = '$$PROFILE/UPDATE_MATCH_RESULT_SUCCESS';
const UPDATE_MATCH_RESULT_FAILURE = '$$PROFILE/UPDATE_MATCH_RESULT_FAILURE';
type UPDATE_MATCH_RESULT_FAILURE = '$$PROFILE/UPDATE_MATCH_RESULT_FAILURE';

const CONFIRM_MATCH_RESULT_REQUESTED = '$$PROFILE/CONFIRM_MATCH_RESULT_REQUESTED';
type CONFIRM_MATCH_RESULT_REQUESTED = '$$PROFILE/CONFIRM_MATCH_RESULT_REQUESTED';
const CONFIRM_MATCH_RESULT_SUCCESS = '$$PROFILE/CONFIRM_MATCH_RESULT_SUCCESS';
type CONFIRM_MATCH_RESULT_SUCCESS = '$$PROFILE/CONFIRM_MATCH_RESULT_SUCCESS';
const CONFIRM_MATCH_RESULT_FAILURE = '$$PROFILE/CONFIRM_MATCH_RESULT_FAILURE';
type CONFIRM_MATCH_RESULT_FAILURE = '$$PROFILE/CONFIRM_MATCH_RESULT_FAILURE';

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

const updateMatchResultRequested = (): UpdateMatchResultRequestedAction => ({ type: UPDATE_MATCH_RESULT_REQUESTED });
const updateMatchResultSuccess = (match: Match): UpdateMatchResultSuccessAction => ({ type: UPDATE_MATCH_RESULT_SUCCESS, match });
const updateMatchResultFailure = (): UpdateMatchResultFailureAction => ({ type: UPDATE_MATCH_RESULT_FAILURE });
const confirmMatchResultRequested = (): ConfirmMatchResultRequestedAction => ({ type: CONFIRM_MATCH_RESULT_REQUESTED });
const confirmMatchResultSuccess = (match: Match): ConfirmMatchResultSuccessAction => ({ type: CONFIRM_MATCH_RESULT_SUCCESS, match });
const confirmMatchResultFailure = (): ConfirmMatchResultFailureAction => ({ type: CONFIRM_MATCH_RESULT_FAILURE });

export const updateMatchResult = (match: Match, won: boolean) =>
  (dispatch: Dispatch, getState: GetState) => {
    dispatch(updateMatchResultRequested());
    const { authentication: { email } } = getState();
    const { team_one, team_two } = match;
    const winner =
      team_one.player_one === email
        ? won ? team_one : team_two
        : won ? team_two : team_one;
    return matches.updateWinner(match, winner)
      .then(match => dispatch(updateMatchResultSuccess(match)))
      .catch(() => dispatch(updateMatchResultFailure()));
  };

export const confirmMatchResult = (match: Match, confirmed: boolean) =>
  (dispatch: Dispatch, getState: GetState) => {
    dispatch(confirmMatchResultRequested());
    return matches.confirmWinner(match, confirmed)
      .then(match => dispatch(confirmMatchResultSuccess(match)))
      .catch(() => dispatch(confirmMatchResultFailure()));
  };

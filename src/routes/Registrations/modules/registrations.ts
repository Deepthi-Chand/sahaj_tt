import { Registration, registrations } from "../../../api";
import { Action, Dispatch } from "../../../store/types";
import { Handlers, addReducer, createReducer } from "../../../utils/createReducer";

export interface RegistrationsState {
  items: Registration[];
  is_loading: boolean;
}

export interface IHaveRegistrationsState {
  registrations?: RegistrationsState;
}

const FETCH_REGISTRATIONS_REQUESTED = '$$REGISTRATIONS/FETCH_REGISTRATIONS_REQUESTED';
type FETCH_REGISTRATIONS_REQUESTED = '$$REGISTRATIONS/FETCH_REGISTRATIONS_REQUESTED';
const FETCH_REGISTRATIONS_SUCCESS = '$$REGISTRATIONS/FETCH_REGISTRATIONS_SUCCESS';
type FETCH_REGISTRATIONS_SUCCESS = '$$REGISTRATIONS/FETCH_REGISTRATIONS_SUCCESS';
const FETCH_REGISTRATIONS_FAILURE = '$$REGISTRATIONS/FETCH_REGISTRATIONS_FAILURE';
type FETCH_REGISTRATIONS_FAILURE = '$$REGISTRATIONS/FETCH_REGISTRATIONS_FAILURE';

interface FetchRegistrationsRequestedAction extends Action<FETCH_REGISTRATIONS_REQUESTED> {
}
interface FetchRegistrationsSuccessAction extends Action<FETCH_REGISTRATIONS_SUCCESS> {
  registrations: Registration[];
}
interface FetchRegistrationsFailureAction extends Action<FETCH_REGISTRATIONS_FAILURE> {
}

const fetchRegistrationsRequested = (): FetchRegistrationsRequestedAction => ({ type: FETCH_REGISTRATIONS_REQUESTED });
const fetchRegistrationsSuccess = (registrations: Registration[]): FetchRegistrationsSuccessAction => ({ type: FETCH_REGISTRATIONS_SUCCESS, registrations });
const fetchRegistrationsFailure = (): FetchRegistrationsFailureAction => ({ type: FETCH_REGISTRATIONS_FAILURE });

export const fetchRegistrations = () =>
  (dispatch: Dispatch) => {
    dispatch(fetchRegistrationsRequested());
    return registrations.get()
      .then(registrations => dispatch(fetchRegistrationsSuccess(registrations)))
      .catch(reason => dispatch(fetchRegistrationsFailure()));
  };

const handlers: Handlers<RegistrationsState> = {};
addReducer(handlers, FETCH_REGISTRATIONS_REQUESTED, (state, action: FetchRegistrationsRequestedAction) => ({ ...state, is_loading: true }));
addReducer(handlers, FETCH_REGISTRATIONS_SUCCESS, (state, { registrations: items }: FetchRegistrationsSuccessAction) => ({ ...state, items, is_loading: false }));
addReducer(handlers, FETCH_REGISTRATIONS_FAILURE, (state, action: FetchRegistrationsFailureAction) => ({ ...state, is_loading: false }));

const initialState: RegistrationsState = {
  items: [],
  is_loading: false
};

export const reducer = createReducer(handlers, initialState);

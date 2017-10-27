import { Registration, registrations } from "../../../api";
import { Action, Dispatch, GetState } from "../../../store/types";
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

const CREATE_REGISTRATION_REQUESTED = '$$REGISTRATIONS/CREATE_REGISTRATION_REQUESTED';
type CREATE_REGISTRATION_REQUESTED = '$$REGISTRATIONS/CREATE_REGISTRATION_REQUESTED';
const CREATE_REGISTRATION_SUCCESS = '$$REGISTRATIONS/CREATE_REGISTRATION_SUCCESS';
type CREATE_REGISTRATION_SUCCESS = '$$REGISTRATIONS/CREATE_REGISTRATION_SUCCESS';
const CREATE_REGISTRATION_FAILURE = '$$REGISTRATIONS/CREATE_REGISTRATION_FAILURE';
type CREATE_REGISTRATION_FAILURE = '$$REGISTRATIONS/CREATE_REGISTRATION_FAILURE';

interface FetchRegistrationsRequestedAction extends Action<FETCH_REGISTRATIONS_REQUESTED> {
}
interface FetchRegistrationsSuccessAction extends Action<FETCH_REGISTRATIONS_SUCCESS> {
  registrations: Registration[];
}
interface FetchRegistrationsFailureAction extends Action<FETCH_REGISTRATIONS_FAILURE> {
}

interface CreateRegistrationRequestedAction extends Action<CREATE_REGISTRATION_REQUESTED> {
  new_registration: Partial<Registration>;
}
interface CreateRegistrationSuccessAction extends Action<CREATE_REGISTRATION_SUCCESS> {
}
interface CreateRegistrationFailureAction extends Action<CREATE_REGISTRATION_FAILURE> {
}


const fetchRegistrationsRequested = (): FetchRegistrationsRequestedAction => ({ type: FETCH_REGISTRATIONS_REQUESTED });
const fetchRegistrationsSuccess = (registrations: Registration[]): FetchRegistrationsSuccessAction => ({ type: FETCH_REGISTRATIONS_SUCCESS, registrations });
const fetchRegistrationsFailure = (): FetchRegistrationsFailureAction => ({ type: FETCH_REGISTRATIONS_FAILURE });

const createRegistrationRequested = (new_registration: Partial<Registration>): CreateRegistrationRequestedAction => ({ type: CREATE_REGISTRATION_REQUESTED, new_registration });
const createRegistrationSuccess = (): CreateRegistrationSuccessAction => ({ type: CREATE_REGISTRATION_SUCCESS });
const createRegistrationFailure = (): CreateRegistrationFailureAction => ({ type: CREATE_REGISTRATION_FAILURE });

export const fetchRegistrations = () =>
  (dispatch: Dispatch, getState: GetState) => {
    dispatch(fetchRegistrationsRequested());
    return registrations.get(getState().authentication.email)
      .then(registrations => dispatch(fetchRegistrationsSuccess(registrations)))
      .catch(reason => dispatch(fetchRegistrationsFailure()));
  };

export const createRegistration = (registration_date: Date) =>
  (dispatch: Dispatch, getState: GetState) => {
    const new_registration: Partial<Registration> = {
      date: registration_date,
      player: getState().authentication.email
    };
    dispatch(createRegistrationRequested(new_registration));
    return registrations.create(new_registration)
      .then(() => dispatch(createRegistrationSuccess()))
      .catch(reason => dispatch(createRegistrationFailure()));
  };


const handlers: Handlers<RegistrationsState> = {};
addReducer(handlers, FETCH_REGISTRATIONS_REQUESTED, (state, action: FetchRegistrationsRequestedAction) => ({ ...state, is_loading: true }));
addReducer(handlers, FETCH_REGISTRATIONS_SUCCESS, (state, { registrations: items }: FetchRegistrationsSuccessAction) => ({ ...state, items, is_loading: false }));
addReducer(handlers, FETCH_REGISTRATIONS_FAILURE, (state, action: FetchRegistrationsFailureAction) => ({ ...state, is_loading: false }));

addReducer(handlers, CREATE_REGISTRATION_REQUESTED, (state, action: CreateRegistrationRequestedAction) => ({ ...state }));
addReducer(handlers, CREATE_REGISTRATION_SUCCESS, (state, action: CreateRegistrationSuccessAction) => ({ ...state }));
addReducer(handlers, CREATE_REGISTRATION_FAILURE, (state, action: CreateRegistrationFailureAction) => ({ ...state }));

const initialState: RegistrationsState = {
  items: [],
  is_loading: false
};

export const reducer = createReducer(handlers, initialState);

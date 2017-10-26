import { Action, Dispatch, GetState } from "../store/types";
import { Handlers, addReducer, createReducer } from "../utils/createReducer";
import { push } from "react-router-redux";

export interface AuthenticationState {
  authenticated: boolean;
  processing: boolean;
  email: string;
  returnUrl: string;
}

export interface IHaveAuthenticationState {
  authentication?: AuthenticationState;
}

const LOGIN_REQUESTED = '$$AUTHENTICATION/LOGIN_REQUESTED';
type LOGIN_REQUESTED = '$$AUTHENTICATION/LOGIN_REQUESTED';
const LOGIN_SUCCESS = '$$AUTHENTICATION/LOGIN_SUCCESS';
type LOGIN_SUCCESS = '$$AUTHENTICATION/LOGIN_SUCCESS';
const LOGIN_FAILURE = '$$AUTHENTICATION/LOGIN_FAILURE';
type LOGIN_FAILURE = '$$AUTHENTICATION/LOGIN_FAILURE';

const LOGOUT_REQUESTED = '$$AUTHENTICATION/LOGOUT_REQUESTED';
type LOGOUT_REQUESTED = '$$AUTHENTICATION/LOGOUT_REQUESTED';
const LOGOUT_SUCCESS = '$$AUTHENTICATION/LOGOUT_SUCCESS';
type LOGOUT_SUCCESS = '$$AUTHENTICATION/LOGOUT_SUCCESS';

interface LoginRequestedAction extends Action<LOGIN_REQUESTED> {
  email: string;
  returnUrl: string;
}
interface LoginSuccessAction extends Action<LOGIN_SUCCESS> {
  email: string;
}
interface LoginFailureAction extends Action<LOGIN_FAILURE> {
  message: string;
}
interface LogoutRequestedAction extends Action<LOGOUT_REQUESTED> {

}
interface LogoutSuccessAction extends Action<LOGOUT_SUCCESS> {

}

const loginRequested = (email: string, returnUrl: string): LoginRequestedAction => ({ type: LOGIN_REQUESTED, email, returnUrl });
const loginFailed = (message: string): LoginFailureAction => ({ type: LOGIN_FAILURE, message });
const loginSuccessful = (email: string): LoginSuccessAction => ({ type: LOGIN_SUCCESS, email });

const logoutRequested = (): LogoutRequestedAction => ({ type: LOGOUT_REQUESTED });
const logoutSuccessful = (): LogoutSuccessAction => ({ type: LOGOUT_SUCCESS });

export const login = (email: string, returnUrl: string) =>
  (dispatch: Dispatch, getState: GetState) => {
    dispatch(loginRequested(email, returnUrl));
    setTimeout(() => {
      dispatch(loginSuccessful(email));
      dispatch(push(getState().authentication.returnUrl));
    }, 1000);
  };

export const logout = () =>
  (dispatch: Dispatch) => {
    dispatch(logoutRequested());
    dispatch(logoutSuccessful());
  };

const handlers: Handlers<AuthenticationState> = {};
addReducer(handlers, LOGIN_REQUESTED, (state, { returnUrl }: LoginRequestedAction) => ({ ...state, processing: true, authenticated: false, returnUrl }));
addReducer(handlers, LOGIN_SUCCESS, (state, { email }: LoginSuccessAction) => ({ ...state, processing: false, email, authenticated: true }));
addReducer(handlers, LOGIN_FAILURE, (state, action: LoginFailureAction) => ({ ...state, processing: false }));
addReducer(handlers, LOGOUT_REQUESTED, (state, action: LogoutRequestedAction) => ({ ...state, processing: true }));
addReducer(handlers, LOGOUT_SUCCESS, (state, action: LogoutSuccessAction) => ({ ...state, processing: false, email: '', authenticated: false }));

const initialState: AuthenticationState = {
  processing: false,
  authenticated: false,
  email: '',
  returnUrl: '/'
};

export const reducer = createReducer(handlers, initialState);

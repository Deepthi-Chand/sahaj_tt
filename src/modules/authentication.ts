import { Action, Dispatch, GetState } from "../store/types";
import { Handlers, addReducer, createReducer } from "../utils/createReducer";
import { push } from "react-router-redux";
import { auth2 } from "./auth2";

export interface AuthenticationState {
  authenticated: boolean;
  processing: boolean;
  email: string;
  returnUrl: string;
  name: string;
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
  returnUrl: string;
}
interface LoginSuccessAction extends Action<LOGIN_SUCCESS> {
  email: string;
  name: string;
}
interface LoginFailureAction extends Action<LOGIN_FAILURE> {
  message: string;
}
interface LogoutRequestedAction extends Action<LOGOUT_REQUESTED> {

}
interface LogoutSuccessAction extends Action<LOGOUT_SUCCESS> {

}

const loginRequested = (returnUrl: string): LoginRequestedAction => ({ type: LOGIN_REQUESTED, returnUrl });
const loginFailed = (message: string): LoginFailureAction => ({ type: LOGIN_FAILURE, message });
const loginSuccessful = (email: string, name: string): LoginSuccessAction => ({ type: LOGIN_SUCCESS, email, name });

const logoutRequested = (): LogoutRequestedAction => ({ type: LOGOUT_REQUESTED });
const logoutSuccessful = (): LogoutSuccessAction => ({ type: LOGOUT_SUCCESS });

const isValidEmail = (email: string) => email.split('@').pop() === 'sahajsoft.com';

export const login = (returnUrl: string) =>
  (dispatch: Dispatch, getState: GetState) => {
    dispatch(loginRequested(returnUrl));
    auth2.signIn().then(() => {
      const user = auth2.currentUser.get().getBasicProfile();
      const email = user.getEmail();
      const hasValidEmail = isValidEmail(email);
      if(!hasValidEmail) {
        alert('You need to login with a sahajsoft.com email');
        dispatch(loginFailed('Invalid email. You need to login with a sahajsoft.com email'))
        dispatch(logout());
        return;
      }
      dispatch(loginSuccessful(email, user.getName()));
      dispatch(push(getState().authentication.returnUrl));
    });
  };

export const logout = () =>
  (dispatch: Dispatch) => {
    dispatch(logoutRequested());
    auth2.signOut().then(() => dispatch(logoutSuccessful()));
  };

const handlers: Handlers<AuthenticationState> = {};
addReducer(handlers, LOGIN_REQUESTED, (state, { returnUrl }: LoginRequestedAction) => ({ ...state, processing: true, authenticated: false, returnUrl }));
addReducer(handlers, LOGIN_SUCCESS, (state, { email, name }: LoginSuccessAction) => ({ ...state, processing: false, email, name, authenticated: true }));
addReducer(handlers, LOGIN_FAILURE, (state, action: LoginFailureAction) => ({ ...state, processing: false }));
addReducer(handlers, LOGOUT_REQUESTED, (state, action: LogoutRequestedAction) => ({ ...state, processing: true }));
addReducer(handlers, LOGOUT_SUCCESS, (state, action: LogoutSuccessAction) => ({ ...state, processing: false, email: '', name: '', authenticated: false }));

const initialState: AuthenticationState = {
  processing: false,
  authenticated: false,
  email: '',
  returnUrl: '/',
  name: ''
};

export const reducer = createReducer(handlers, initialState);

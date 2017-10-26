export interface AuthenticationState {
  is_authenticated: boolean;
  user_name: string;
}

export interface IHaveAuthenticationState {
  authentication?: AuthenticationState;
}


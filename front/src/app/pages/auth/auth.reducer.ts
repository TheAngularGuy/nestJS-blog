import { JwtTokenModel } from 'src/app/models/jwt.token.model';
import { UserModel } from 'src/app/models/user.model';
import { AuthActions, AuthActionTypes } from 'src/app/pages/auth/auth.actions';

export interface AuthState {
  loggedIn: boolean;
  user: UserModel;
  jwtToken: JwtTokenModel;
}

export const initialAuthState: AuthState = {
  loggedIn: false,
  user: undefined,
  jwtToken: undefined
};

export function authReducer(state: AuthState = initialAuthState, action: AuthActions): AuthState {
  const newState = { ...state };
  switch (action.type) {
    case AuthActionTypes.LoginAction:
      newState.loggedIn = true;
      newState.user = action.payload.jwtToken.user;
      newState.jwtToken = {
        token: action.payload.jwtToken.token,
        expireDate: action.payload.jwtToken.expireDate
      };
      break;
    case AuthActionTypes.LogoutAction:
      newState.loggedIn = false;
      newState.user = null;
      break;
  }
  return newState;
}

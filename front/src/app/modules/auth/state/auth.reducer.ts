import { JwtTokenModel } from 'src/app/models/jwt.token.model';
import { UserModel } from 'src/app/models/user.model';
import { AuthActions, AuthActionTypes } from 'src/app/modules/auth/state/auth.actions';

export interface AuthState {
  loggedIn: boolean;
  user: UserModel;
  jwtToken: JwtTokenModel;
}

export const initialAuthState: AuthState = {
  loggedIn: false,
  user: undefined,
  jwtToken: undefined,
};

export function authReducer(state: AuthState = initialAuthState, action: AuthActions): AuthState {
  const newState = { ...state };
  switch (action.type) {
    case AuthActionTypes.LoginActionOK:
      newState.loggedIn = true;
      newState.user = action.payload.jwtToken.user;
      newState.jwtToken = {
        token: action.payload.jwtToken.token,
        expireDate: action.payload.jwtToken.expireDate,
      };
      break;
    case AuthActionTypes.LogoutAction:
      newState.loggedIn = false;
      newState.user = null;
      break;
    case AuthActionTypes.EditUserOK:
      newState.user = { ...newState.user, ...action.payload.user };
      break;
  }
  return newState;
}

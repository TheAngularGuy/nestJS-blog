import { JwtTokenModel } from 'src/app/models/jwt.token.model';
import { UserModel } from 'src/app/models/user.model';
import { AuthActions, LoginAction, LogoutAction } from 'src/app/pages/auth/auth.actions';

export interface AuthState {
  loggedIn: boolean;
  user: UserModel;
  jwtToken: JwtTokenModel;
}

export const initialAuthState: AuthState = {
  loggedIn: false,
  user: null,
  jwtToken: null
};

export function authReducer(
  state: AuthState = initialAuthState,
  action: AuthActions
): AuthState {
  const newState = { ...state };
  switch (action.type) {
    case new LoginAction().type:
      newState.loggedIn = true;
      newState.user = action.payload.jwtToken.user;
      newState.jwtToken = {
        token: action.payload.jwtToken.token,
        expireDate: action.payload.jwtToken.expireDate
      };
      break;
    case new LogoutAction().type:
      newState.loggedIn = false;
      newState.user = null;
      break;
  }
  return newState;
}

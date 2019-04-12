import { UserModel } from 'src/app/models/user.model';
import { AuthActions, LoginAction, LogoutAction } from 'src/app/pages/auth/auth.actions';


export interface AuthState {
  loggedIn: boolean;
  user: UserModel;
}

export const initialAuthState: AuthState = {
  loggedIn: false,
  user: null,
};

export function authReducer(state: AuthState = initialAuthState, action: AuthActions): AuthState {
  const newState = { ...state };
  switch (action.type) {
    case new LoginAction().type:
      newState.loggedIn = true;
      newState.user = action.payload.user;
      break;
    case new LogoutAction().type:
      newState.loggedIn = false;
      newState.user = null;
      break;
  }
  return newState;
}

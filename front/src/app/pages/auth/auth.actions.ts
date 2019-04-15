import { Action } from '@ngrx/store';
import { JwtTokenModel } from 'src/app/models/jwt.token.model';

enum AuthActionTypes {
  LoginAction = '[Auth] Login',
  LogoutAction = '[Auth] Logout'
}

export class LoginAction implements Action {
  readonly type = AuthActionTypes.LoginAction;

  constructor(public payload?: { jwtToken: JwtTokenModel }) {}
}

export class LogoutAction implements Action {
  readonly type = AuthActionTypes.LogoutAction;
}

export type AuthActions = LoginAction | LogoutAction;

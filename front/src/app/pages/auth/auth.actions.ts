import { Action } from '@ngrx/store';
import { JwtTokenModel } from 'src/app/models/jwt.token.model';

export enum AuthActionTypes {
  LoginAction = '[Auth] Login',
  LogoutAction = '[Auth] Logout'
}

export class LoginAction implements Action {
  readonly type = AuthActionTypes.LoginAction;

  constructor(public payload: { jwtToken: JwtTokenModel; redirect?: boolean }) {}
}

export class LogoutAction implements Action {
  readonly type = AuthActionTypes.LogoutAction;

  constructor(public payload?: { redirect: boolean }) {}
}

export type AuthActions = LoginAction | LogoutAction;

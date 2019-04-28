import { Action } from '@ngrx/store';
import { JwtTokenModel } from 'src/app/models/jwt.token.model';
import { UserModel } from 'src/app/models/user.model';

export enum AuthActionTypes {
  LoginAction = '[Auth] Login',
  LoginActionOK = '[Auth] Login success',
  LoginActionKO = '[Auth] Login KO',
  LogoutAction = '[Auth] Logout',
  UpdateUser = '[Auth] Update user',
}

export class LoginAction implements Action {
  readonly type = AuthActionTypes.LoginAction;

  constructor(
    public payload: {
      form: { email: string; password: string; remember: boolean };
      redirect?: boolean;
      redirectTo?: string;
    },
  ) {}
}

export class LoginActionOK implements Action {
  readonly type = AuthActionTypes.LoginActionOK;

  constructor(public payload: { jwtToken: JwtTokenModel; redirect?: boolean; redirectTo?: string }) {}
}

export class LoginActionKO implements Action {
  readonly type = AuthActionTypes.LoginActionKO;

  constructor(public payload: { errorMessage: string }) {}
}

export class LogoutAction implements Action {
  readonly type = AuthActionTypes.LogoutAction;

  constructor(public payload?: { redirect: boolean }) {}
}

export class UpdateUserAction implements Action {
  readonly type = AuthActionTypes.UpdateUser;

  constructor(public payload: { user: UserModel }) {}
}

export type AuthActions =
  | LoginAction
  | LogoutAction
  | UpdateUserAction
  | LoginAction
  | LoginActionOK
  | LoginActionKO;

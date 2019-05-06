import { Action } from '@ngrx/store';
import { JwtTokenModel } from 'src/app/models/jwt.token.model';
import { PasswordModel } from 'src/app/models/password.model';
import { UserModel } from 'src/app/models/user.model';

export enum AuthActionTypes {
  LoginAction = '[Auth] Login',
  LoginActionOK = '[Auth] Login success',
  LoginActionKO = '[Auth] Login KO',
  LogoutAction = '[Auth] Logout',

  ChangePassword = '[User] Change password',
  ChangePasswordOK = '[User] Change password success',
  ChangePasswordKO = '[User] Change password KO',

  EditUser = '[User] Edit user',
  EditUserOK = '[User] Edit user success',
  EditUserKO = '[User] Edit user KO',
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

// * user
export class EditUserAction implements Action {
  readonly type = AuthActionTypes.EditUser;

  constructor(public payload: { user: UserModel }) {}
}

export class EditUserActionOK implements Action {
  readonly type = AuthActionTypes.EditUserOK;

  constructor(public payload: { user: UserModel }) {}
}

export class EditUserActionKO implements Action {
  readonly type = AuthActionTypes.EditUserKO;

  constructor(public payload: { errorMessage: string }) {}
}

// * password
export class ChangePasswordAction implements Action {
  readonly type = AuthActionTypes.ChangePassword;

  constructor(public payload: { id: number; passwords: PasswordModel }) {}
}

export class ChangePasswordActionOK implements Action {
  readonly type = AuthActionTypes.ChangePasswordOK;

  constructor(public payload: { id: number; passwords: PasswordModel }) {}
}

export class ChangePasswordActionKO implements Action {
  readonly type = AuthActionTypes.ChangePasswordKO;

  constructor(public payload: { errorMessage: string }) {}
}

export type AuthActions =
  | LoginAction
  | LogoutAction
  | LoginAction
  | LoginActionOK
  | LoginActionKO
  | ChangePasswordAction
  | ChangePasswordActionOK
  | ChangePasswordActionKO
  | EditUserAction
  | EditUserActionKO
  | EditUserActionOK;

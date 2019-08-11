import { Action } from '@ngrx/store';
import { JwtTokenModel } from 'src/app/models/jwt.token.model';
import { LoginDto } from 'src/app/models/login.dto';
import { PasswordModel } from 'src/app/models/password.model';
import { RegisterDto } from 'src/app/models/register.dto';
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

  RegisterAction = '[Auth] Register',
  RegisterActionOK = '[Auth] Register success',
  RegisterActionKO = '[Auth] Register KO',
}
// ! login
export class LoginAction implements Action {
  readonly type = AuthActionTypes.LoginAction;
  constructor(public payload: { form: LoginDto; redirect?: boolean; redirectTo?: string }) {}
}
export class LoginActionOK implements Action {
  readonly type = AuthActionTypes.LoginActionOK;
  constructor(
    public payload: {
      jwtToken: JwtTokenModel;
      redirect?: boolean;
      redirectTo?: string;
      remember?: boolean;
    },
  ) {}
}
export class LoginActionKO implements Action {
  readonly type = AuthActionTypes.LoginActionKO;
  constructor(public payload: { errorMessage: string }) {}
}
// ! logout
export class LogoutAction implements Action {
  readonly type = AuthActionTypes.LogoutAction;
  constructor(public payload?: { redirect: boolean }) {}
}
// ! edit user
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
// ! edit password
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
// ! register
export class RegisterAction implements Action {
  readonly type = AuthActionTypes.RegisterAction;
  constructor(public payload: { form: RegisterDto }) {}
}
export class RegisterActionKO implements Action {
  readonly type = AuthActionTypes.RegisterActionKO;
  constructor(public payload: { errorMessage: string }) {}
}

export type AuthActions =
  | LoginAction
  | LoginActionOK
  | LoginActionKO
  | LogoutAction
  | RegisterAction
  | RegisterActionKO
  | ChangePasswordAction
  | ChangePasswordActionOK
  | ChangePasswordActionKO
  | EditUserAction
  | EditUserActionOK
  | EditUserActionKO;

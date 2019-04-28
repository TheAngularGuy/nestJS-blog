import { Action } from '@ngrx/store';
import { PasswordModel } from 'src/app/models/password.model';
import { UserModel } from 'src/app/models/user.model';

export enum UserActionTypes {
  ChangePassword = '[User] Change password',
  ChangePasswordOK = '[User] Change password success',
  ChangePasswordKO = '[User] Change password KO',

  EditUser = '[User] Edit user',
  EditUserOK = '[User] Edit user success',
  EditUserKO = '[User] Edit user KO',
}

// * user
export class EditUserAction implements Action {
  readonly type = UserActionTypes.EditUser;

  constructor(public payload: { user: UserModel }) {}
}

export class EditUserActionOK implements Action {
  readonly type = UserActionTypes.EditUserOK;

  constructor(public payload: { user: UserModel }) {}
}

export class EditUserActionKO implements Action {
  readonly type = UserActionTypes.EditUserKO;

  constructor(public payload: { errorMessage: string }) {}
}

// * password
export class ChangePasswordAction implements Action {
  readonly type = UserActionTypes.ChangePassword;

  constructor(public payload: { id: number; passwords: PasswordModel }) {}
}

export class ChangePasswordActionOK implements Action {
  readonly type = UserActionTypes.ChangePasswordOK;

  constructor(public payload: { id: number; passwords: PasswordModel }) {}
}

export class ChangePasswordActionKO implements Action {
  readonly type = UserActionTypes.ChangePasswordKO;

  constructor(public payload: { errorMessage: string }) {}
}

export type UserActions =
  | ChangePasswordAction
  | ChangePasswordActionOK
  | ChangePasswordActionKO
  | EditUserAction
  | EditUserActionKO
  | EditUserActionOK;

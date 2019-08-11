import { Action } from '@ngrx/store';
import { UserModel } from 'src/app/models/user.model';

export enum AdminActionTypes {
  LoadUsers = '[Admin] Load users',
  LoadUsersOK = '[Admin] Load users success',
  LoadUsersKO = '[Admin] Load users KO',

  CountUsers = '[Admin] Count users',
  CountUsersOK = '[Admin] Count users success',
  CountUsersKO = '[Admin] Count users KO',

  SetAdminUser = '[Admin] Set Admin User',
  SetAdminUserOK = '[Admin] Set Admin User success',
  SetAdminUserKO = '[Admin] Set Admin User KO',

  SetAuthorUser = '[Admin] Set Author User',
  SetAuthorUserOK = '[Admin] Set Author User success',
  SetAuthorUserKO = '[Admin] Set Author User KO',
}

// ! load
export class LoadUsersAction implements Action {
  readonly type = AdminActionTypes.LoadUsers;
  constructor(public payload: { page: number; take: number }) {}
}
export class LoadUsersActionOK implements Action {
  readonly type = AdminActionTypes.LoadUsersOK;
  constructor(public payload: { users: UserModel[]; page: number; take: number }) {}
}
export class LoadUsersActionKO implements Action {
  readonly type = AdminActionTypes.LoadUsersKO;
  constructor(public payload: { errorMessage: string }) {}
}
// ! count
export class CountUsersAction implements Action {
  readonly type = AdminActionTypes.CountUsers;
}
export class CountUsersActionOK implements Action {
  readonly type = AdminActionTypes.CountUsersOK;
  constructor(public payload: { total: number }) {}
}
export class CountUsersActionKO implements Action {
  readonly type = AdminActionTypes.CountUsersKO;
  constructor(public payload: { errorMessage: string }) {}
}
// ! set admin
export class SetAdminUserAction implements Action {
  readonly type = AdminActionTypes.SetAdminUser;
  constructor(public payload: { user: UserModel }) {}
}
export class SetAdminUserActionOK implements Action {
  readonly type = AdminActionTypes.SetAdminUserOK;
  constructor(public payload: { user: UserModel }) {}
}
export class SetAdminUserActionKO implements Action {
  readonly type = AdminActionTypes.SetAdminUserKO;
  constructor(public payload: { errorMessage: string }) {}
}
// ! set author
export class SetAuthorUserAction implements Action {
  readonly type = AdminActionTypes.SetAuthorUser;
  constructor(public payload: { user: UserModel }) {}
}
export class SetAuthorUserActionOK implements Action {
  readonly type = AdminActionTypes.SetAuthorUserOK;
  constructor(public payload: { user: UserModel }) {}
}
export class SetAuthorUserActionKO implements Action {
  readonly type = AdminActionTypes.SetAuthorUserKO;
  constructor(public payload: { errorMessage: string }) {}
}

export type AdminActions =
  | LoadUsersAction
  | LoadUsersActionOK
  | LoadUsersActionKO
  | CountUsersAction
  | CountUsersActionOK
  | CountUsersActionKO
  | SetAdminUserAction
  | SetAdminUserActionOK
  | SetAdminUserActionKO
  | SetAuthorUserAction
  | SetAuthorUserActionOK
  | SetAuthorUserActionKO;

import { Action } from '@ngrx/store';
import { UserModel } from 'src/app/models/user.model';

export enum AdminActionTypes {
  LoadUsers = '[Admin] Load users',
  LoadUsersOK = '[Admin] Load users success',
  LoadUsersKO = '[Admin] Load users KO',
}

// ! user
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

export type AdminActions = LoadUsersAction | LoadUsersActionOK | LoadUsersActionKO;

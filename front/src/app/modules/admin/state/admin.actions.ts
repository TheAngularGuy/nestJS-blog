import { Action } from '@ngrx/store';
import { CategoryModel } from 'src/app/models/category.model';

export enum AdminActionTypes {
  LoadUsers = '[Admin] Load users',
  LoadUsersOK = '[Admin] Load users success',
  LoadUsersKO = '[Admin] Load users KO',
}

// ! user
export class LoadUsersAction implements Action {
  readonly type = AdminActionTypes.LoadUsers;
}
export class LoadUsersActionOK implements Action {
  readonly type = AdminActionTypes.LoadUsersOK;
  constructor(public payload: { authors: CategoryModel[] }) {}
}
export class LoadUsersActionKO implements Action {
  readonly type = AdminActionTypes.LoadUsersKO;
  constructor(public payload: { errorMessage: string }) {}
}

export type AdminActions = LoadUsersAction | LoadUsersActionOK | LoadUsersActionKO;

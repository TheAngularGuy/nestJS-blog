import { Action } from '@ngrx/store';
import { CategoryModel } from 'src/app/models/category.model';

export enum AdminActionTypes {
  LoadAuthors = '[Admin] Load Authors',
  LoadAuthorsOK = '[Admin] Load Authors success',
  LoadAuthorsKO = '[Admin] Load Authors KO',
}

// ! authors
export class LoadAuthorsAction implements Action {
  readonly type = AdminActionTypes.LoadAuthors;
}
export class LoadAuthorsActionOK implements Action {
  readonly type = AdminActionTypes.LoadAuthorsOK;
  constructor(public payload: { authors: CategoryModel[] }) {}
}
export class LoadAuthorsActionKO implements Action {
  readonly type = AdminActionTypes.LoadAuthorsKO;
  constructor(public payload: { errorMessage: string }) {}
}

export type AdminActions = LoadAuthorsAction | LoadAuthorsActionOK | LoadAuthorsActionKO;

import { Action } from '@ngrx/store';
import { UserModel } from 'src/app/models/user.model';

export enum AuthorsActionTypes {
  LoadAuthors = '[Authors] Load Authors',
  LoadAuthorsOK = '[Authors] Load Authors success',
  LoadAuthorsKO = '[Authors] Load Authors KO',
}

// ! authors
export class LoadAuthorsAction implements Action {
  readonly type = AuthorsActionTypes.LoadAuthors;
}
export class LoadAuthorsActionOK implements Action {
  readonly type = AuthorsActionTypes.LoadAuthorsOK;
  constructor(public payload: { authors: UserModel[] }) {}
}
export class LoadAuthorsActionKO implements Action {
  readonly type = AuthorsActionTypes.LoadAuthorsKO;
  constructor(public payload: { errorMessage: string }) {}
}

export type AdminActions = LoadAuthorsAction | LoadAuthorsActionOK | LoadAuthorsActionKO;

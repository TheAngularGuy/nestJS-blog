import { Action } from '@ngrx/store';
import { CategoryModel } from 'src/app/models/category.model';

export enum AdminActionTypes {
  LoadCategories = '[Admin] Load Categories',
  LoadCategoriesOK = '[Admin] Load Categories success',
  LoadCategoriesKO = '[Admin] Load Categories KO',
  AddCategorie = '[Admin] Add Categorie',
  AddCategorieOK = '[Admin] Add Categorie success',
  AddCategorieKO = '[Admin] Add Categorie KO',

  LoadAuthors = '[Admin] Load Authors',
  LoadAuthorsOK = '[Admin] Load Authors success',
  LoadAuthorsKO = '[Admin] Load Authors KO',
}

// ! categories
export class LoadCategoriesAction implements Action {
  readonly type = AdminActionTypes.LoadCategories;
}
export class LoadCategoriesActionOK implements Action {
  readonly type = AdminActionTypes.LoadCategoriesOK;
  constructor(public payload: { categories: CategoryModel[] }) {}
}
export class LoadCategoriesActionKO implements Action {
  readonly type = AdminActionTypes.LoadCategoriesKO;
  constructor(public payload: { errorMessage: string }) {}
}

export class AddCategorieAction implements Action {
  readonly type = AdminActionTypes.AddCategorie;
  constructor(public payload: { category: CategoryModel }) {}
}
export class AddCategorieActionOK implements Action {
  readonly type = AdminActionTypes.AddCategorieOK;
  constructor(public payload: { category: CategoryModel }) {}
}
export class AddCategorieActionKO implements Action {
  readonly type = AdminActionTypes.AddCategorieKO;
  constructor(public payload: { errorMessage: string }) {}
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

export type AdminActions =
  | AddCategorieAction
  | AddCategorieActionOK
  | AddCategorieActionKO
  | LoadCategoriesAction
  | LoadCategoriesActionOK
  | LoadCategoriesActionKO
  | LoadAuthorsAction
  | LoadAuthorsActionOK
  | LoadAuthorsActionKO;

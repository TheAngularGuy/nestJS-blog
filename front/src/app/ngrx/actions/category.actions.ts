import { Action } from '@ngrx/store';
import { CategoryModel } from 'src/app/models/category.model';

export enum CategoryActionTypes {
  LoadCategories = '[Admin] Load Categories',
  LoadCategoriesOK = '[Admin] Load Categories success',
  LoadCategoriesKO = '[Admin] Load Categories KO',
  AddCategorie = '[Admin] Add Categorie',
  AddCategorieOK = '[Admin] Add Categorie success',
  AddCategorieKO = '[Admin] Add Categorie KO',
}

// ! categories
export class LoadCategoriesAction implements Action {
  readonly type = CategoryActionTypes.LoadCategories;
}
export class LoadCategoriesActionOK implements Action {
  readonly type = CategoryActionTypes.LoadCategoriesOK;
  constructor(public payload: { categories: CategoryModel[] }) {}
}
export class LoadCategoriesActionKO implements Action {
  readonly type = CategoryActionTypes.LoadCategoriesKO;
  constructor(public payload: { errorMessage: string }) {}
}

export class AddCategorieAction implements Action {
  readonly type = CategoryActionTypes.AddCategorie;
  constructor(public payload: { category: CategoryModel }) {}
}
export class AddCategorieActionOK implements Action {
  readonly type = CategoryActionTypes.AddCategorieOK;
  constructor(public payload: { category: CategoryModel }) {}
}
export class AddCategorieActionKO implements Action {
  readonly type = CategoryActionTypes.AddCategorieKO;
  constructor(public payload: { errorMessage: string }) {}
}

export type CategoryActions =
  | AddCategorieAction
  | AddCategorieActionOK
  | AddCategorieActionKO
  | LoadCategoriesAction
  | LoadCategoriesActionOK
  | LoadCategoriesActionKO;

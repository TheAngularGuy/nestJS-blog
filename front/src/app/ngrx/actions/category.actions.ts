import { Action } from '@ngrx/store';
import { CategoryModel } from 'src/app/models/category.model';

export enum CategoryActionTypes {
  LoadCategories = '[Category] Load Categories',
  LoadCategoriesOK = '[Category] Load Categories success',
  LoadCategoriesKO = '[Category] Load Categories KO',

  AddCategorie = '[Category] Add Categorie',
  AddCategorieOK = '[Category] Add Categorie success',
  AddCategorieKO = '[Category] Add Categorie KO',

  EditCategorie = '[Category] Edit Categorie',
  EditCategorieOK = '[Category] Edit Categorie success',
  EditCategorieKO = '[Category] Edit Categorie KO',

  DeleteCategorie = '[Category] Delete Categorie',
  DeleteCategorieOK = '[Category] Delete Categorie success',
  DeleteCategorieKO = '[Category] Delete Categorie KO',
}

// ! load
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
// ! add
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
// ! edit
export class EditCategorieAction implements Action {
  readonly type = CategoryActionTypes.EditCategorie;
  constructor(public payload: { category: CategoryModel }) {}
}
export class EditCategorieActionOK implements Action {
  readonly type = CategoryActionTypes.EditCategorieOK;
  constructor(public payload: { category: CategoryModel }) {}
}
export class EditCategorieActionKO implements Action {
  readonly type = CategoryActionTypes.EditCategorieKO;
  constructor(public payload: { errorMessage: string }) {}
}
// ! delete
export class DeleteCategorieAction implements Action {
  readonly type = CategoryActionTypes.DeleteCategorie;
  constructor(public payload: { category: CategoryModel }) {}
}
export class DeleteCategorieActionOK implements Action {
  readonly type = CategoryActionTypes.DeleteCategorieOK;
  constructor(public payload: { category: CategoryModel }) {}
}
export class DeleteCategorieActionKO implements Action {
  readonly type = CategoryActionTypes.DeleteCategorieKO;
  constructor(public payload: { errorMessage: string }) {}
}

export type CategoryActions =
  | AddCategorieAction
  | AddCategorieActionOK
  | AddCategorieActionKO
  | LoadCategoriesAction
  | LoadCategoriesActionOK
  | LoadCategoriesActionKO
  | DeleteCategorieAction
  | DeleteCategorieActionOK
  | DeleteCategorieActionKO
  | EditCategorieAction
  | EditCategorieActionOK
  | EditCategorieActionKO;

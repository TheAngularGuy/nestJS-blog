import { Action } from '@ngrx/store';
import { CategoryModel } from 'src/app/models/category.model';

export enum LayoutActionTypes {
  RequestCategories = '[Layout] request categories',
  LoadCategories = '[Layout] Load categories',
}

export class RequestCategoriesAction implements Action {
  readonly type = LayoutActionTypes.RequestCategories;
  constructor() {}
}

export class LoadCategoriesAction implements Action {
  readonly type = LayoutActionTypes.LoadCategories;

  constructor(public payload: { list: CategoryModel[] }) {}
}

export type LayoutActions = LoadCategoriesAction | RequestCategoriesAction;

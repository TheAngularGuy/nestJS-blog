import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { defer, Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CategoryService } from 'src/app/providers/category.service';

import {
  AddCategorieAction,
  AddCategorieActionKO,
  AddCategorieActionOK,
  CategoryActionTypes,
  DeleteCategorieAction,
  DeleteCategorieActionKO,
  DeleteCategorieActionOK,
  EditCategorieAction,
  EditCategorieActionKO,
  EditCategorieActionOK,
  LoadCategoriesAction,
  LoadCategoriesActionKO,
  LoadCategoriesActionOK,
} from '../actions/category.actions';

@Injectable()
export class CategoryEffects {
  constructor(private readonly actions$: Actions, private readonly service: CategoryService) {}

  @Effect()
  loadCategories: Observable<any> = this.actions$.pipe(
    ofType(CategoryActionTypes.LoadCategories),
    mergeMap((action: LoadCategoriesAction) => {
      return this.service.getCategories().pipe(
        map(list => {
          return new LoadCategoriesActionOK({
            categories: list,
          });
        }),
        catchError(err => {
          console.error('log: AdminEffects -> constructor -> err', err);
          return of(
            new LoadCategoriesActionKO({
              errorMessage: 'Error while loading the categories',
            }),
          );
        }),
      );
    }),
  );

  @Effect()
  addCategory: Observable<any> = this.actions$.pipe(
    ofType(CategoryActionTypes.AddCategorie),
    mergeMap((action: AddCategorieAction) => {
      return this.service.addCategories(action.payload.category).pipe(
        map(c => {
          return new AddCategorieActionOK({
            category: c,
          });
        }),
        catchError(err => {
          console.error('log: AdminEffects -> constructor -> err', err);
          return of(
            new AddCategorieActionKO({
              errorMessage: 'Error while loading the categories',
            }),
          );
        }),
      );
    }),
  );

  @Effect()
  editCategory: Observable<any> = this.actions$.pipe(
    ofType(CategoryActionTypes.EditCategorie),
    mergeMap((action: EditCategorieAction) => {
      return this.service.editCategories(action.payload.category).pipe(
        map(c => {
          return new EditCategorieActionOK({
            category: c,
          });
        }),
        catchError(err => {
          console.error('log: AdminEffects -> constructor -> err', err);
          return of(
            new EditCategorieActionKO({
              errorMessage: 'Error while saving the category',
            }),
          );
        }),
      );
    }),
  );

  @Effect()
  deleteCategory: Observable<any> = this.actions$.pipe(
    ofType(CategoryActionTypes.DeleteCategorie),
    mergeMap((action: DeleteCategorieAction) => {
      return this.service.deleteCategories(action.payload.category).pipe(
        map(c => {
          return new DeleteCategorieActionOK({
            category: action.payload.category,
          });
        }),
        catchError(err => {
          console.error('log: AdminEffects -> constructor -> err', err);
          return of(
            new DeleteCategorieActionKO({
              errorMessage: 'Error while saving the category',
            }),
          );
        }),
      );
    }),
  );

  @Effect()
  init$: Observable<any> = defer(() => {
    return of(new LoadCategoriesAction() as any);
  });

  /* End effects */
}

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CategoryService } from 'src/app/providers/category.service';

import {
  AddCategorieAction,
  AddCategorieActionKO,
  AddCategorieActionOK,
  CategoryActionTypes,
  LoadCategoriesAction,
  LoadCategoriesActionKO,
  LoadCategoriesActionOK,
} from '../actions/category.actions';

@Injectable()
export class AdminEffects {
  constructor(private readonly actions$: Actions, private readonly admService: CategoryService) {}

  @Effect()
  loadCategories: Observable<any> = this.actions$.pipe(
    ofType(CategoryActionTypes.LoadCategories),
    mergeMap((action: LoadCategoriesAction) => {
      return this.admService.getCategories().pipe(
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
      return this.admService.addCategories(action.payload.category).pipe(
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

  /* End effects */
}

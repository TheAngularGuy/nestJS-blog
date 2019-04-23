import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { LayoutService } from '../layout.service';
import { LayoutActionTypes, LoadCategoriesAction } from './layout.actions';

@Injectable()
export class LayoutEffects {
  constructor(private readonly actions$: Actions, private readonly layService: LayoutService) {}

  @Effect()
  requestCategoriesToLoad: Observable<any> = this.actions$.pipe(
    ofType(LayoutActionTypes.RequestCategories),
    mergeMap(() => {
      return this.layService.getCategories().pipe(
        map(list => {
          return new LoadCategoriesAction({ list });
        }),
      );
    }),
  );
}

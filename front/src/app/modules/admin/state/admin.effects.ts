import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { AdminService } from '../admin.service';
import { AdminActionTypes, LoadUsersAction, LoadUsersActionKO, LoadUsersActionOK } from './admin.actions';

@Injectable()
export class AdminEffects {
  constructor(private readonly actions$: Actions, private readonly admService: AdminService) {}

  @Effect()
  loadCategories: Observable<any> = this.actions$.pipe(
    ofType(AdminActionTypes.LoadUsers),
    mergeMap((action: LoadUsersAction) => {
      return this.admService.getUsers().pipe(
        map(list => {
          return new LoadUsersActionOK({
            users: list,
            page: action.payload.page,
            take: action.payload.take,
          });
        }),
        catchError(err => {
          console.error('Debbug log: AdminEffects -> constructor -> err', err);
          return of(
            new LoadUsersActionKO({
              errorMessage: 'Error while loading the users',
            }),
          );
        }),
      );
    }),
  );

  /* End effects */
}

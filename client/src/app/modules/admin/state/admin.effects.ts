import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

import { AdminService } from '../admin.service';
import {
  AdminActionTypes,
  CountUsersActionOK,
  LoadUsersAction,
  LoadUsersActionKO,
  LoadUsersActionOK,
  SetAdminUserAction,
  SetAdminUserActionOK,
  SetAuthorUserAction,
  SetAuthorUserActionKO,
  SetAuthorUserActionOK,
} from './admin.actions';

@Injectable()
export class AdminEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly admService: AdminService,
  ) {}

  @Effect()
  loadUsers: Observable<any> = this.actions$.pipe(
    ofType(AdminActionTypes.LoadUsers),
    mergeMap((action: LoadUsersAction) => {
      return this.admService.getUsers(action.payload.page, action.payload.take).pipe(
        tap(() => {
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
              page: action.payload.page,
              take: action.payload.take,
            },
            queryParamsHandling: 'merge',
          });
        }),
        map(list => {
          return new LoadUsersActionOK({
            users: list,
            page: action.payload.page,
            take: action.payload.take,
          });
        }),
        catchError(err => {
          console.error('Debbug log: AdminEffects -> loadUsers -> err', err);
          return of(
            new LoadUsersActionKO({
              errorMessage: 'Error while loading the users',
            }),
          );
        }),
      );
    }),
  );

  @Effect()
  countUsers: Observable<any> = this.actions$.pipe(
    ofType(AdminActionTypes.LoadUsersOK),
    mergeMap((action: LoadUsersActionOK) => {
      return this.admService.getCount().pipe(
        map(total => {
          return new CountUsersActionOK({
            total,
          });
        }),
        catchError(err => {
          console.error('Debbug log: AdminEffects -> countUsers -> err', err);
          return of(
            new LoadUsersActionKO({
              errorMessage: 'Error while counting the users',
            }),
          );
        }),
      );
    }),
  );

  @Effect()
  setAdminUser: Observable<any> = this.actions$.pipe(
    ofType(AdminActionTypes.SetAdminUser),
    mergeMap((action: SetAdminUserAction) => {
      return this.admService.editUser(action.payload.user).pipe(
        map(user => {
          return new SetAdminUserActionOK({
            user,
          });
        }),
        catchError(err => {
          console.error('Debbug log: AdminEffects -> setAdminUser -> err', err);
          return of(
            new LoadUsersActionKO({
              errorMessage: 'Error while set the users as admin',
            }),
          );
        }),
      );
    }),
  );

  @Effect()
  setAuthorUser: Observable<any> = this.actions$.pipe(
    ofType(AdminActionTypes.SetAuthorUser),
    mergeMap((action: SetAuthorUserAction) => {
      return this.admService.editUser(action.payload.user).pipe(
        map(user => {
          return new SetAuthorUserActionOK({
            user,
          });
        }),
        catchError(err => {
          console.error('Debbug log: AdminEffects -> setAdminUser -> err', err);
          return of(
            new SetAuthorUserActionKO({
              errorMessage: 'Error while set the users as admin',
            }),
          );
        }),
      );
    }),
  );

  /*   @Effect()
  init$: Observable<any> = defer(() => {
    return of(new CountUsersAction() as any);
  }); */

  /* End effects */
}

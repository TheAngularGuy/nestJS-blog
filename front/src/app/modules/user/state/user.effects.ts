import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { UserService } from '../user.service';
import {
  ChangePasswordAction,
  ChangePasswordActionKO,
  ChangePasswordActionOK,
  EditUserAction,
  EditUserActionKO,
  EditUserActionOK,
  UserActionTypes,
} from './user.actions';

@Injectable()
export class UserEffects {
  constructor(private readonly actions$: Actions, private readonly userService: UserService) {}

  @Effect()
  changePwd$: Observable<any> = this.actions$.pipe(
    ofType(UserActionTypes.ChangePassword),
    mergeMap((action: ChangePasswordAction) => {
      return this.userService.changePassword(action.payload.id, action.payload.passwords).pipe(
        map(user => {
          return new ChangePasswordActionOK(action.payload);
        }),
        catchError(errWrapper => {
          return of(
            new ChangePasswordActionKO({
              errorMessage: 'An error occured, Maybe your password is wrong',
            }),
          );
        }),
      );
    }),
  );

  @Effect()
  editUser$: Observable<any> = this.actions$.pipe(
    ofType(UserActionTypes.EditUser),
    mergeMap((action: EditUserAction) => {
      return this.userService.editUser(action.payload.user.id, action.payload.user).pipe(
        map(user => {
          return new EditUserActionOK(action.payload);
        }),
        catchError(errWrapper => {
          return of(
            new EditUserActionKO({
              errorMessage: 'An error occured, contact an admin',
            }),
          );
        }),
      );
    }),
  );
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { defer, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, take, tap } from 'rxjs/operators';
import { JwtTokenModel } from 'src/app/models/jwt.token.model';
import {
  AuthActions,
  AuthActionTypes,
  ChangePasswordAction,
  ChangePasswordActionKO,
  ChangePasswordActionOK,
  EditUserAction,
  EditUserActionKO,
  EditUserActionOK,
  LoginAction,
  LoginActionKO,
  LoginActionOK,
  LogoutAction,
  RegisterAction,
  RegisterActionKO,
} from 'src/app/modules/auth/state/auth.actions';

import { AuthService } from '../auth.service';

@Injectable()
export class AuthEffects {
  @Effect()
  register: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.RegisterAction),
    mergeMap((action: RegisterAction) => {
      return this.authService.register(action.payload.form).pipe(
        take(1),
        map((jwtToken: JwtTokenModel) => {
          return new LoginActionOK({
            jwtToken,
            redirect: true,
            remember: true,
          });
        }),
        catchError((err: any) => {
          console.error(err);
          return of(
            new RegisterActionKO({
              errorMessage: 'Error : An Error occured',
            }),
          );
        }),
      );
    }),
  );

  @Effect()
  login$: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LoginAction),
    mergeMap((action: LoginAction) => {
      return this.authService.login(action.payload.form).pipe(
        take(1),
        map((jwtToken: JwtTokenModel) => {
          return new LoginActionOK({
            jwtToken,
            redirect: action.payload.redirect,
            redirectTo: action.payload.redirectTo,
            remember: action.payload.form.remember,
          });
        }),
        catchError((err: any) => {
          console.error(err);
          return of(
            new LoginActionKO({
              errorMessage: 'Error : Bad login or password',
            }),
          );
        }),
      );
    }),
  );

  @Effect({ dispatch: false })
  loginOK: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LoginActionOK),
    tap((action: LoginActionOK) => {
      if (action.payload.remember) {
        localStorage.setItem('jwtToken', JSON.stringify(action.payload.jwtToken));
      }
      if (action.payload.redirect) {
        const redirectTo =
          action.payload.redirectTo && !action.payload.redirectTo.includes('auth')
            ? action.payload.redirectTo
            : null;
        this.router.navigateByUrl(redirectTo || '/');
      }
    }),
  );

  @Effect({ dispatch: false })
  logout$: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LogoutAction),
    tap((action: LogoutAction) => {
      localStorage.removeItem('jwtToken');
      if (action.payload && action.payload.redirect) {
        this.router.navigate(['/']);
      }
    }),
  );

  @Effect()
  changePwd$: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.ChangePassword),
    mergeMap((action: ChangePasswordAction) => {
      return this.authService.changePassword(action.payload.id, action.payload.passwords).pipe(
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
    ofType(AuthActionTypes.EditUser),
    mergeMap((action: EditUserAction) => {
      return this.authService.editUser(action.payload.user.id, action.payload.user).pipe(
        map(user => {
          const userData: JwtTokenModel = JSON.parse(localStorage.getItem('jwtToken'));
          userData.user = {
            ...userData.user,
            ...action.payload.user,
          };
          localStorage.setItem('jwtToken', JSON.stringify(userData));
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

  @Effect()
  init$: Observable<any> = defer(() => {
    const userData = localStorage.getItem('jwtToken');
    if (userData) {
      return of(new LoginActionOK({ jwtToken: JSON.parse(userData) }) as any);
    }
    return of(new LogoutAction() as any);
  });

  constructor(
    private readonly actions$: Actions<AuthActions>,
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {}
}

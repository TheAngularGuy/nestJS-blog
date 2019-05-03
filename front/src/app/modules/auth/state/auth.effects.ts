import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { defer, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, take, tap } from 'rxjs/operators';
import { JwtTokenModel } from 'src/app/models/jwt.token.model';
import {
  AuthActions,
  AuthActionTypes,
  LoginAction,
  LoginActionKO,
  LoginActionOK,
  LogoutAction,
  UpdateUserAction,
} from 'src/app/modules/auth/state/auth.actions';

import { EditUserActionOK, UserActionTypes } from '../../user/state/user.actions';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthEffects {
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
      localStorage.setItem('jwtToken', JSON.stringify(action.payload.jwtToken));
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
  updateUser$: Observable<any> = this.actions$.pipe(
    ofType(UserActionTypes.EditUserOK),
    map((action: EditUserActionOK) => {
      return new UpdateUserAction({
        user: action.payload.user,
      });
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

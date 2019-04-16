import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { defer, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthActions, AuthActionTypes, LoginAction, LogoutAction } from 'src/app/pages/auth/auth.actions';

@Injectable()
export class AuthEffects {
  @Effect({ dispatch: false })
  login$: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LoginAction),
    tap((action: LoginAction) => {
      localStorage.setItem('jwtToken', JSON.stringify(action.payload.jwtToken));
      if (action.payload.redirect) {
        this.router.navigate(['/']);
      }
    })
  );

  @Effect({ dispatch: false })
  logout$: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LogoutAction),
    tap((action: LogoutAction) => {
      localStorage.removeItem('jwtToken');
      if (action.payload && action.payload.redirect) {
        this.router.navigate(['/']);
      }
    })
  );

  @Effect()
  init$: Observable<any> = defer(() => {
    const userData = localStorage.getItem('jwtToken');
    if (userData) {
      return of(new LoginAction({ jwtToken: JSON.parse(userData) }) as any);
    }
    return of(new LogoutAction() as any);
  });

  constructor(private readonly actions$: Actions<AuthActions>, private readonly router: Router, private store: Store<any>) {}
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { defer, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthActions, LoginAction, LogoutAction } from 'src/app/pages/auth/auth.actions';

@Injectable()
export class AuthEffects {
  @Effect({ dispatch: false })
  login$: Observable<any> = this.actions$.pipe(
    ofType(new LoginAction().type),
    tap((action: LoginAction) => {
      localStorage.setItem('jwtToken', JSON.stringify(action.payload.jwtToken));
      this.router.navigate(['/']); // TODO: go to the last visited page
    })
  );

  @Effect({ dispatch: false })
  logout$: Observable<any> = this.actions$.pipe(
    ofType(new LogoutAction().type),
    tap((action: LogoutAction) => {
      console.log('storing:', action);
      localStorage.removeItem('jwtToken');
      this.router.navigate(['/']);
    })
  );

  @Effect()
  init$: Observable<any> = defer(() => {
    const userData = localStorage.getItem('jwtToken');
    if (userData) {
      return of(new LoginAction({ jwtToken: JSON.parse(userData) }) as any);
    }
    // return of(new LogoutAction() as any);
  });

  constructor(
    private readonly actions$: Actions<AuthActions>,
    private readonly router: Router
  ) {}
}

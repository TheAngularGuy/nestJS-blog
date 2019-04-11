import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginAction, LogoutAction } from 'src/app/ngrx/actions/auth.actions';

@Injectable()
export class AuthEffects {

  @Effect()
  login$: Observable<any>;

  constructor(private actions$: Actions<LoginAction | LogoutAction>) {
    this.login$ = this.actions$
      .pipe(
        ofType((new LoginAction()).type),
        tap((action: LoginAction) => {
          console.log('storing:', action);
          localStorage.setItem('user', JSON.stringify(action.payload.user));
        })
      );
  }



}

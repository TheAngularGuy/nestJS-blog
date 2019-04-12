import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginAction, LogoutAction } from 'src/app/ngrx/actions/auth.actions';

@Injectable()
export class AuthEffects {

  @Effect({ dispatch: false })
  login$: Observable<any> = this.actions$
    .pipe(
      ofType((new LoginAction()).type),
      tap((action: LoginAction) => {
        // NOTE: effect implementation here
        console.log('storing:', action);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
    );

  @Effect({ dispatch: false })
  logout$: Observable<any> = this.actions$
    .pipe(
      ofType((new LogoutAction()).type),
      tap((action: LogoutAction) => {
        // NOTE: effect implementation here
        console.log('storing:', action);
        localStorage.removeItem('user');
      })
    );

  constructor(
    private actions$: Actions<LoginAction | LogoutAction>
  ) { }

}

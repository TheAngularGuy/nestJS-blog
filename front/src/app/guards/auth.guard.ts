import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { AppState } from 'src/app/ngrx/reducers';

import { isLoggedInSelector } from '../pages/auth/auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private readonly store: Store<AppState>,
    private readonly router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(isLoggedInSelector).pipe(
      tap((isLogged) => {
        if (!isLogged) {
          this.router.navigate(['/auth']);
        }
      })
    );
  }
}

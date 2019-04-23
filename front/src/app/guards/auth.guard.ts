import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import { isLoggedInSelector } from '../pages/auth/state/auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private readonly store: Store<any>, private readonly router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(isLoggedInSelector).pipe(
      tap(isLogged => {
        if (!isLogged) {
          this.router.navigate(['/auth'], {
            queryParams: {
              referer: state.url,
            },
          });
        }
      }),
    );
  }
}

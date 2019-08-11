import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { noop, Observable } from 'rxjs';
import { first, map, mergeMap, tap } from 'rxjs/operators';

import { JwtTokenModel } from '../models/jwt.token.model';
import { LogoutAction } from '../modules/auth/state/auth.actions';
import { jwtTokenSelector } from '../modules/auth/state/auth.selectors';
import { AppState } from '../ngrx/reducers';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private readonly store: Store<AppState>, private readonly router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select(jwtTokenSelector).pipe(
      first(),
      map((jwtToken: JwtTokenModel) => {
        return jwtToken ? jwtToken : { token: '' };
      }),
      mergeMap((jwtToken: JwtTokenModel) => {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${jwtToken.token}`,
          },
        });
        return next.handle(request).pipe(
          tap(noop, err => {
            if (err.status == 401) {
              this.store.dispatch(new LogoutAction({ redirect: false }));
              this.router.navigate(['/auth'], {
                queryParams: {
                  referer: this.router.url,
                },
              });
              console.warn('AppHttpInterceptor catched Error', err);
            }
          }),
        );
      }),
    );
  }
}

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first, map, mergeMap } from 'rxjs/operators';

import { JwtTokenModel } from '../models/jwt.token.model';
import { jwtTokenSelector } from '../modules/auth/state/auth.selectors';
import { AppState } from '../ngrx/reducers';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private readonly store: Store<AppState>) {}

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
        return next.handle(request);
      }),
    );
  }
}

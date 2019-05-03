import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { CreatorService } from '../creator.service';
import { CreatorActionTypes, SendArticleAction, SendArticleActionKO, SendArticleActionOK } from './creator.actions';

@Injectable()
export class CreatorEffects {
  @Effect()
  changePwd$: Observable<any> = this.actions$.pipe(
    ofType(CreatorActionTypes.sendArticle),
    mergeMap((action: SendArticleAction) => {
      return this.creService.changePassword(action.payload.article).pipe(
        map(article => {
          return new SendArticleActionOK(action.payload);
        }),
        catchError(errWrapper => {
          return of(
            new SendArticleActionKO({
              errorMessage: 'An error occured, Maybe your password is wrong',
            }),
          );
        }),
      );
    }),
  );

  constructor(private readonly actions$: Actions, private readonly creService: CreatorService) {}
}

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { CreatorService } from '../creator.service';
import {
  CountOwnArticlesAction,
  CountOwnArticlesActionKO,
  CountOwnArticlesActionOK,
  CreatorActionTypes,
  GetOwnArticlesAction,
  GetOwnArticlesActionKO,
  GetOwnArticlesActionOK,
  SendArticleAction,
  SendArticleActionKO,
  SendArticleActionOK,
} from './creator.actions';

@Injectable()
export class CreatorEffects {
  @Effect()
  changePwd$: Observable<any> = this.actions$.pipe(
    ofType(CreatorActionTypes.sendArticle),
    mergeMap((action: SendArticleAction) => {
      return this.creService.sendArticle(action.payload.article).pipe(
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

  @Effect()
  loadArticles: Observable<any> = this.actions$.pipe(
    ofType(CreatorActionTypes.GetOwnArticles),
    mergeMap((action: GetOwnArticlesAction) => {
      return this.creService.getArticles().pipe(
        map(list => {
          return new GetOwnArticlesActionOK({
            articles: list,
            page: action.payload.page,
            take: action.payload.take,
          });
        }),
        catchError(err => {
          console.error('Debbug log: CreatorEffects -> loadArticles -> err', err);
          return of(
            new GetOwnArticlesActionKO({
              errorMessage: 'Error while loading the articles',
            }),
          );
        }),
      );
    }),
  );

  @Effect()
  countArticles: Observable<any> = this.actions$.pipe(
    ofType(CreatorActionTypes.CountArticles),
    mergeMap((action: CountOwnArticlesAction) => {
      return this.creService.getCount().pipe(
        map(total => {
          return new CountOwnArticlesActionOK({
            total,
          });
        }),
        catchError(err => {
          console.error('Debbug log: CreatorEffects -> countUsers -> err', err);
          return of(
            new CountOwnArticlesActionKO({
              errorMessage: 'Error while counting the articles',
            }),
          );
        }),
      );
    }),
  );

  constructor(private readonly actions$: Actions, private readonly creService: CreatorService) {}
}

import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

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
  UpdateArticleAction,
  UpdateArticleActionKO,
  UpdateArticleActionOK,
} from './creator.actions';

@Injectable()
export class CreatorEffects {
  @Effect()
  addArticle$: Observable<any> = this.actions$.pipe(
    ofType(CreatorActionTypes.sendArticle),
    mergeMap((action: SendArticleAction) => {
      return this.creService.sendArticle(action.payload.article).pipe(
        map(article => {
          return new SendArticleActionOK(action.payload);
        }),
        catchError(errWrapper => {
          return of(
            new SendArticleActionKO({
              errorMessage: 'An error occured while adding an article',
            }),
          );
        }),
      );
    }),
  );

  @Effect()
  editArticle$: Observable<any> = this.actions$.pipe(
    ofType(CreatorActionTypes.updateArticle),
    mergeMap((action: UpdateArticleAction) => {
      return this.creService.editArticle(action.payload.article, action.payload.id).pipe(
        map(article => {
          return new UpdateArticleActionOK(action.payload);
        }),
        catchError(errWrapper => {
          return of(
            new UpdateArticleActionKO({
              errorMessage: 'An error occured while updating the article',
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
      return this.creService.getArticles(action.payload.page, action.payload.take).pipe(
        tap(() => {
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
              page: action.payload.page,
              take: action.payload.take,
            },
            queryParamsHandling: 'merge',
          });
        }),
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
    ofType(CreatorActionTypes.GetOwnArticlesOK),
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

  constructor(
    private readonly actions$: Actions,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly creService: CreatorService,
  ) {}
}

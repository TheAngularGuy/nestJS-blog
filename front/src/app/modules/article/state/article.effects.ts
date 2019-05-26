import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { ArticleModel } from 'src/app/models/article.model';

import { ArticleService } from '../article.service';
import {
  ArticleActions,
  ArticleActionTypes,
  CountArticlesAction,
  LoadArticlesAction,
  LoadArticlesActionKO,
  LoadArticlesActionOK,
  LoadOneArticleAction,
  LoadOneArticleActionOK,
} from './article.actions';

@Injectable()
export class ArticleEffects {
  constructor(
    private readonly actions$: Actions<ArticleActions>,
    private readonly articleService: ArticleService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  @Effect()
  loadArticles$: Observable<any> = this.actions$.pipe(
    ofType(ArticleActionTypes.Loadarticles),
    mergeMap((action: LoadArticlesAction) => {
      const page = action.payload.page;
      const take = action.payload.take;
      const mode = action.payload.mode;
      return this.articleService.getAll(page, take, mode).pipe(
        tap(() => {
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
              page,
              take,
            },
            queryParamsHandling: 'merge',
          });
        }),
        map(
          (articlesList: ArticleModel[]) =>
            new LoadArticlesActionOK({
              list: articlesList,
              page,
              take,
              mode,
            }),
        ),
        catchError(err => {
          console.error('Debbug log: ArticleEffects -> err', err);
          return of(new LoadArticlesActionKO({ errorMessage: 'Error: Articles not found' }));
        }),
      );
    }),
  );

  @Effect()
  countArticles$: Observable<any> = this.actions$.pipe(
    ofType(ArticleActionTypes.LoadArticlesOK),
    mergeMap((action: LoadArticlesActionOK) => {
      return this.articleService.getCount(action.payload.mode).pipe(
        map((count: number) => {
          return new CountArticlesAction({ count });
        }),
      );
    }),
  );

  @Effect()
  loadOneArticle$: Observable<any> = this.actions$.pipe(
    ofType(ArticleActionTypes.LoadOneArticle),
    mergeMap((action: LoadOneArticleAction) => {
      return this.articleService.getOne(action.payload.id).pipe(
        map((article: ArticleModel) => {
          return new LoadOneArticleActionOK({ article });
        }),
      );
    }),
  );
}

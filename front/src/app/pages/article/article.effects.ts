import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { ArticleModel } from 'src/app/models/article.model';

import {
  ArticleActions,
  ArticleActionTypes,
  CountArticlesAction,
  LoadArticlesAction,
  LoadOneArticleAction,
  RequestArticlesAction,
  RequestOneArticleAction,
} from './article.actions';
import { ArticleService } from './article.service';

@Injectable()
export class ArticleEffects {
  constructor(
    private readonly actions$: Actions<ArticleActions>,
    private readonly articleService: ArticleService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  @Effect()
  requestToLoad$: Observable<any> = this.actions$.pipe(
    ofType(ArticleActionTypes.RequestArticles),
    mergeMap((action: RequestArticlesAction) => {
      const page = action.payload.page;
      const take = action.payload.take;
      return this.articleService.getAll(page, take).pipe(
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
            new LoadArticlesAction({
              list: articlesList,
              page,
              take,
            }),
        ),
      );
    }),
  );

  @Effect()
  loadToCount$: Observable<any> = this.actions$.pipe(
    ofType(ArticleActionTypes.LoadArticles),
    mergeMap((action: LoadArticlesAction) => {
      return this.articleService.getCount().pipe(
        map((count: number) => {
          return new CountArticlesAction({ count });
        }),
      );
    }),
  );

  @Effect()
  requestOneToLoadOne$: Observable<any> = this.actions$.pipe(
    ofType(ArticleActionTypes.RequestOneArticle),
    mergeMap((action: RequestOneArticleAction) => {
      return this.articleService.getOne(action.payload.id).pipe(
        map((article: ArticleModel) => {
          return new LoadOneArticleAction({ article });
        }),
      );
    }),
  );
}

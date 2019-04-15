import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ArticleModel } from 'src/app/models/article.model';

import {
  ArticleActions,
  ArticleActionTypes,
  CountArticlesAction,
  LoadArticlesAction,
  RequestArticlesAction,
} from './article.actions';
import { ArticleService } from './article.service';

@Injectable()
export class ArticleEffects {
  @Effect()
  requestToLoad$: Observable<any> = this.actions$.pipe(
    ofType(ArticleActionTypes.RequestArticles),
    mergeMap((action: RequestArticlesAction) => {
      const page = action.payload.page;
      const take = action.payload.take;
      return this.articleService.getAll(page, take).pipe(
        map(
          (articlesList: ArticleModel[]) =>
            new LoadArticlesAction({
              list: articlesList,
              page,
              take
            })
        )
      );
    })
  );

  @Effect()
  loadToCount$: Observable<any> = this.actions$.pipe(
    ofType(ArticleActionTypes.LoadArticles),
    mergeMap((action: LoadArticlesAction) => {
      return this.articleService.getCount().pipe(
        map((count: number) => {
          return new CountArticlesAction({ count });
        })
      );
    })
  );

  constructor(
    private readonly actions$: Actions<ArticleActions>,
    private readonly articleService: ArticleService
  ) {}
}

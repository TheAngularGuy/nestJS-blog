import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ArticleModel } from 'src/app/models/article.model';

import { ArticleActions, LoadArticlesAction, RequestArticlesAction } from './article.actions';
import { ArticleService } from './article.service';

@Injectable()
export class ArticleEffects {
  @Effect()
  requestToLoad$: Observable<any> = this.actions$.pipe(
    ofType(new RequestArticlesAction().type),
    mergeMap((action: RequestArticlesAction) => {
      const page = action.payload ? action.payload.page : undefined;
      const take = action.payload ? action.payload.take : undefined;
      return this.articleService
        .getAll(page, take)
        .pipe(map((articles: ArticleModel[]) => new LoadArticlesAction({ articles })));
    })
  );

  constructor(
    private readonly actions$: Actions<ArticleActions>,
    private readonly articleService: ArticleService
  ) {}
}

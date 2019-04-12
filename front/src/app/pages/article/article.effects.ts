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
  request$: Observable<any> = this.actions$.pipe(
    ofType((new RequestArticlesAction()).type),
    mergeMap(() => {
      return this.articleService.getAll()
        .pipe(
          map((articles: ArticleModel[]) => new LoadArticlesAction({ articles }))
        );
    })
  );


  constructor(
    private readonly actions$: Actions<ArticleActions>,
    private readonly articleService: ArticleService
  ) { }

}

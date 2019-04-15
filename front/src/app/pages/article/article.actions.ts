import { Action } from '@ngrx/store';
import { ArticleModel } from 'src/app/models/article.model';

export enum ArticleActionTypes {
  CountArticles = '[Article] Count Articles',
  LoadArticles = '[Article] Load Articles',
  RequestArticles = '[Article] Request Articles'
}

export class LoadArticlesAction implements Action {
  readonly type = ArticleActionTypes.LoadArticles;

  constructor(
    public payload: {
      list: ArticleModel[];
      page: number;
      take: number;
    }
  ) {}
}

export class RequestArticlesAction implements Action {
  readonly type = ArticleActionTypes.RequestArticles;

  constructor(public payload: { page: number; take: number }) {}
}

export class CountArticlesAction implements Action {
  readonly type = ArticleActionTypes.CountArticles;

  constructor(public payload: { count: number }) {}
}

export type ArticleActions = LoadArticlesAction | RequestArticlesAction | CountArticlesAction;

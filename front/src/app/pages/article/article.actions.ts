import { Action } from '@ngrx/store';
import { ArticleModel } from 'src/app/models/article.model';

export enum ArticleActionTypes {
  LoadArticles = '[Article] Load Articles',
  RequestArticles = '[Article] Request Articles',
}

export class LoadArticlesAction implements Action {
  readonly type = ArticleActionTypes.LoadArticles;

  constructor(public payload?: { articles: ArticleModel[] }) { }
}

export class RequestArticlesAction implements Action {
  readonly type = ArticleActionTypes.RequestArticles;

  constructor(public payload?: { page: number, take: number }) { }
}


export type ArticleActions = LoadArticlesAction | RequestArticlesAction;

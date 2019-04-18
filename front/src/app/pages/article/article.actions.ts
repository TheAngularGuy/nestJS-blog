import { Action } from '@ngrx/store';
import { ArticleModel } from 'src/app/models/article.model';

export enum ArticleActionTypes {
  CountArticles = '[Article] Count Articles',
  LoadArticles = '[Article] Load Articles',
  RequestArticles = '[Article] Request Articles',
  RequestOneArticle = '[Article] Request one Article',
  LoadOneArticle = '[Article] Load one Article',
}

export class LoadArticlesAction implements Action {
  readonly type = ArticleActionTypes.LoadArticles;

  constructor(
    public payload: {
      list: ArticleModel[];
      page: number;
      take: number;
    },
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

export class RequestOneArticleAction implements Action {
  readonly type = ArticleActionTypes.RequestOneArticle;

  constructor(public payload: { id: number }) {}
}

export class LoadOneArticleAction implements Action {
  readonly type = ArticleActionTypes.LoadOneArticle;

  constructor(public payload: { article: ArticleModel }) {}
}

export type ArticleActions =
  | LoadArticlesAction
  | RequestArticlesAction
  | CountArticlesAction
  | LoadOneArticleAction
  | RequestOneArticleAction;

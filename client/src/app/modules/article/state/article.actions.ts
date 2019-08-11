import { Action } from '@ngrx/store';
import { ArticleModel } from 'src/app/models/article.model';

export enum ArticleActionTypes {
  CountArticles = '[Article] Count Articles',

  Loadarticles = '[Article] Request Articles',
  LoadArticlesOK = '[Article] Load Articles success',
  LoadArticlesKO = '[Article] Load Articles KO',

  LoadOneArticle = '[Article] Request one Article',
  LoadOneArticleOK = '[Article] Load one Article success',
  LoadOneArticleKO = '[Article] Load one Article KO',
}

// ! load all
export class LoadArticlesAction implements Action {
  readonly type = ArticleActionTypes.Loadarticles;
  constructor(public payload: { page: number; take: number; mode?: string }) {}
}
export class LoadArticlesActionOK implements Action {
  readonly type = ArticleActionTypes.LoadArticlesOK;
  constructor(
    public payload: {
      list: ArticleModel[];
      page: number;
      take: number;
      mode?: string;
    },
  ) {}
}
export class LoadArticlesActionKO implements Action {
  readonly type = ArticleActionTypes.LoadArticlesKO;
  constructor(public payload: { errorMessage: string }) {}
}
// ! count
export class CountArticlesAction implements Action {
  readonly type = ArticleActionTypes.CountArticles;
  constructor(public payload: { count: number }) {}
}
// ! load one
export class LoadOneArticleAction implements Action {
  readonly type = ArticleActionTypes.LoadOneArticle;
  constructor(public payload: { id: number }) {}
}
export class LoadOneArticleActionOK implements Action {
  readonly type = ArticleActionTypes.LoadOneArticleOK;
  constructor(public payload: { article: ArticleModel }) {}
}
export class LoadOneArticleActionKO implements Action {
  readonly type = ArticleActionTypes.LoadOneArticleKO;
  constructor(public payload: { errorMessage: string }) {}
}

export type ArticleActions =
  | LoadArticlesAction
  | LoadArticlesActionOK
  | LoadArticlesActionKO
  | CountArticlesAction
  | LoadOneArticleActionOK
  | LoadOneArticleActionKO
  | LoadOneArticleAction;

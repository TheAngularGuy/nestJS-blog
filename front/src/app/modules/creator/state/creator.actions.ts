import { Action } from '@ngrx/store';
import { ArticleDto } from 'src/app/models/article.dto';
import { ArticleModel } from 'src/app/models/article.model';

export enum CreatorActionTypes {
  sendArticle = '[Creator] Send article',
  sendArticleOK = '[Creator] Send article success',
  sendArticleKO = '[Creator] Send article KO',

  GetOwnArticles = '[Creator] Get article',
  GetOwnArticlesOK = '[Creator] Get article success',
  GetOwnArticlesKO = '[Creator] Get article KO',

  CountArticles = '[Creator] Count articles',
  CountArticlesOK = '[Creator] Count articles success',
  CountArticlesKO = '[Creator] Count articles KO',
}

// ! add
export class SendArticleAction implements Action {
  readonly type = CreatorActionTypes.sendArticle;
  constructor(public payload: { article: ArticleDto }) {}
}
export class SendArticleActionOK implements Action {
  readonly type = CreatorActionTypes.sendArticleOK;
  constructor(public payload: { article: ArticleDto }) {}
}
export class SendArticleActionKO implements Action {
  readonly type = CreatorActionTypes.sendArticleKO;
  constructor(public payload: { errorMessage: string }) {}
}
// ! get all user articles
export class GetOwnArticlesAction implements Action {
  readonly type = CreatorActionTypes.GetOwnArticles;
  constructor(public payload: { page: number; take: number }) {}
}
export class GetOwnArticlesActionOK implements Action {
  readonly type = CreatorActionTypes.GetOwnArticlesOK;
  constructor(public payload: { articles: ArticleModel[]; page: number; take: number }) {}
}
export class GetOwnArticlesActionKO implements Action {
  readonly type = CreatorActionTypes.GetOwnArticlesKO;
  constructor(public payload: { errorMessage: string }) {}
}
// ! count
export class CountOwnArticlesAction implements Action {
  readonly type = CreatorActionTypes.CountArticles;
}
export class CountOwnArticlesActionOK implements Action {
  readonly type = CreatorActionTypes.CountArticlesOK;
  constructor(public payload: { total: number }) {}
}
export class CountOwnArticlesActionKO implements Action {
  readonly type = CreatorActionTypes.CountArticlesKO;
  constructor(public payload: { errorMessage: string }) {}
}

export type CreatorActions =
  | SendArticleAction
  | SendArticleActionOK
  | SendArticleActionKO
  | GetOwnArticlesAction
  | GetOwnArticlesActionOK
  | GetOwnArticlesActionKO
  | CountOwnArticlesAction
  | CountOwnArticlesActionOK
  | CountOwnArticlesActionKO;

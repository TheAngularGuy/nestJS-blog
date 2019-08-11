import { Action } from '@ngrx/store';
import { ArticleDto } from 'src/app/models/article.dto';
import { ArticleModel } from 'src/app/models/article.model';

export enum CreatorActionTypes {
  sendArticle = '[Creator] Send article',
  sendArticleOK = '[Creator] Send article success',
  sendArticleKO = '[Creator] Send article KO',

  updateArticle = '[Creator] edit article',
  updateArticleOK = '[Creator] edit article success',
  updateArticleKO = '[Creator] edit article KO',

  deleteArticle = '[Creator] delete article',
  deleteArticleOK = '[Creator] delete article success',
  deleteArticleKO = '[Creator] delete article KO',

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
// ! edit
export class UpdateArticleAction implements Action {
  readonly type = CreatorActionTypes.updateArticle;
  constructor(public payload: { article: ArticleDto; id: number }) {}
}
export class UpdateArticleActionOK implements Action {
  readonly type = CreatorActionTypes.updateArticleOK;
  constructor(public payload: { article: ArticleDto; id: number }) {}
}
export class UpdateArticleActionKO implements Action {
  readonly type = CreatorActionTypes.updateArticleKO;
  constructor(public payload: { errorMessage: string }) {}
}
// ! delete
export class DeleteArticleAction implements Action {
  readonly type = CreatorActionTypes.deleteArticle;
  constructor(public payload: { id: number }) {}
}
export class DeleteArticleActionOK implements Action {
  readonly type = CreatorActionTypes.deleteArticleOK;
  constructor(public payload: { id: number }) {}
}
export class DeleteArticleActionKO implements Action {
  readonly type = CreatorActionTypes.deleteArticleKO;
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
  | UpdateArticleAction
  | UpdateArticleActionOK
  | UpdateArticleActionKO
  | DeleteArticleAction
  | DeleteArticleActionOK
  | DeleteArticleActionKO
  | GetOwnArticlesAction
  | GetOwnArticlesActionOK
  | GetOwnArticlesActionKO
  | CountOwnArticlesAction
  | CountOwnArticlesActionOK
  | CountOwnArticlesActionKO;

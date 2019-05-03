import { Action } from '@ngrx/store';
import { ArticleDto } from 'src/app/models/article.dto';

export enum CreatorActionTypes {
  sendArticle = '[Creator] Send article',
  sendArticleOK = '[Creator] Send article success',
  sendArticleKO = '[Creator] Send article KO',
}

export class SendArticleAction implements Action {
  readonly type = CreatorActionTypes.sendArticle;

  constructor(
    public payload: {
      article: ArticleDto;
    },
  ) {}
}

export class SendArticleActionOK implements Action {
  readonly type = CreatorActionTypes.sendArticleOK;

  constructor(
    public payload: {
      article: ArticleDto;
    },
  ) {}
}

export class SendArticleActionKO implements Action {
  readonly type = CreatorActionTypes.sendArticleKO;

  constructor(
    public payload: {
      errorMessage: string;
    },
  ) {}
}

export type CreatorActions = SendArticleAction | SendArticleActionOK | SendArticleActionKO;

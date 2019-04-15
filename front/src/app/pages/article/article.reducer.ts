import { ArticleModel } from 'src/app/models/article.model';

import { ArticleActions, ArticleActionTypes } from './article.actions';

export interface ArticleState {
  list: ArticleModel[];
  page: number;
  take: number;
  count: number;
}

export const initialArticleState: ArticleState = {
  list: undefined,
  page: undefined,
  take: undefined,
  count: undefined
};

export function reducer(state = initialArticleState, action: ArticleActions): ArticleState {
  switch (action.type) {
    case ArticleActionTypes.LoadArticles:
      return {
        list: action.payload.list,
        page: action.payload.page,
        take: action.payload.take,
        count: undefined
      };
    case ArticleActionTypes.CountArticles:
      return {
        list: [...state.list],
        page: state.page,
        take: state.take,
        count: action.payload.count
      };
    default:
      return state;
  }
}

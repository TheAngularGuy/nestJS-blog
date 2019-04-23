import { ArticleModel } from 'src/app/models/article.model';

import { ArticleActions, ArticleActionTypes } from './article.actions';

export interface ArticleState {
  list: ArticleModel[];
  page: number;
  take: number;
  count: number;
  focusedOn?: ArticleModel;
}

export const initialArticleState: ArticleState = {
  list: null,
  page: null,
  take: null,
  count: null,
};

export function reducer(state = initialArticleState, action: ArticleActions): ArticleState {
  switch (action.type) {
    case ArticleActionTypes.LoadArticles:
      return {
        list: action.payload.list,
        page: action.payload.page,
        take: action.payload.take,
        count: null,
        focusedOn: { ...state.focusedOn },
      };
    case ArticleActionTypes.CountArticles:
      return {
        list: [...(state.list || [])],
        page: state.page,
        take: state.take,
        count: action.payload.count,
        focusedOn: { ...state.focusedOn },
      };
    case ArticleActionTypes.LoadOneArticle:
      return {
        list: [...(state.list || [])],
        page: state.page,
        take: state.take,
        count: state.count,
        focusedOn: action.payload.article,
      };
    default:
      return state;
  }
}

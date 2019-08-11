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
  page: 1,
  take: 5,
  count: null,
};

export function reducer(state = initialArticleState, action: ArticleActions): ArticleState {
  switch (action.type) {
    case ArticleActionTypes.LoadArticlesOK:
      return {
        list: action.payload.list,
        page: action.payload.page,
        take: action.payload.take,
        count: null,
        focusedOn: { ...state.focusedOn },
      };
    case ArticleActionTypes.LoadArticlesKO:
      return {
        ...initialArticleState,
        list: [],
        count: 0,
      };
    case ArticleActionTypes.CountArticles:
      return {
        list: [...(state.list || [])],
        page: state.page,
        take: state.take,
        count: action.payload.count,
        focusedOn: { ...state.focusedOn },
      };
    case ArticleActionTypes.LoadOneArticleOK:
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

import { ArticleModel } from 'src/app/models/article.model';

import { CreatorActions, CreatorActionTypes } from './creator.actions';

export interface CreatorState {
  articles: ArticleModel[];
  page: number;
  take: number;
  total: number;
}

export const initialCreatorState: CreatorState = {
  articles: [],
  page: 1,
  take: 10,
  total: 0,
};

export function reducer(state = initialCreatorState, action: CreatorActions): CreatorState {
  switch (action.type) {
    case CreatorActionTypes.GetOwnArticlesOK:
      return {
        ...state,
        articles: action.payload.articles,
        page: action.payload.page,
        take: action.payload.take,
      };
    case CreatorActionTypes.CountArticlesOK:
      return {
        ...state,
        total: action.payload.total,
      };
    case CreatorActionTypes.deleteArticleOK:
      return {
        ...state,
        articles: state.articles.filter(el => el.id != action.payload.id),
      };
    default:
      return state;
  }
}

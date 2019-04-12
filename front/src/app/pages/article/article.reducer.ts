import { ArticleModel } from 'src/app/models/article.model';

import { ArticleActions, LoadArticlesAction } from './article.actions';


export interface ArticleState {
  articles: ArticleModel[];
}

export const initialArticleState: ArticleState = {
  articles: null,
};

export function reducer(state = initialArticleState, action: ArticleActions): ArticleState {
  switch (action.type) {
    case (new LoadArticlesAction()).type:
      return {
        articles: action.payload.articles,
      };
    default:
      return state;
  }
}

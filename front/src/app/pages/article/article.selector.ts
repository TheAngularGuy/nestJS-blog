import { createSelector } from '@ngrx/store';

import { ArticleState, initialArticleState } from './article.reducer';


export const articleStateSelector = (state: any) => state.article as ArticleState || initialArticleState;

export const articleListSelector = createSelector(articleStateSelector, (articleState) => {
  return articleState.articles;
});

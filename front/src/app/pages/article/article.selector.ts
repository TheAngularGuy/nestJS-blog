import { createSelector } from '@ngrx/store';

import { ArticleState, initialArticleState } from './article.reducer';

export const articleStateSelector = (state: any) =>
  (state.article as ArticleState) || initialArticleState;

export const articleListSelector = createSelector(
  articleStateSelector,
  articleState => {
    return articleState.list;
  }
);

export const articlePageSelector = createSelector(
  articleStateSelector,
  articleState => {
    return articleState.page;
  }
);

export const articleCountSelector = createSelector(
  articleStateSelector,
  articleState => {
    return articleState.count;
  }
);

export const articleTakeSelector = createSelector(
  articleStateSelector,
  articleState => {
    return articleState.take;
  }
);

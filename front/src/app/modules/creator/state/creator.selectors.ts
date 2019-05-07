import { createSelector } from '@ngrx/store';

import { CreatorState, initialCreatorState } from './creator.reducer';

export const creatorStateSelector = (state: any) =>
  (state.creator as CreatorState) || initialCreatorState;

export const ownArticleListSelector = createSelector(
  creatorStateSelector,
  creaState => {
    return creaState.articles;
  },
);

export const ownArticleCountSelector = createSelector(
  creatorStateSelector,
  creaState => {
    return creaState.total;
  },
);

export const ownArticleByIdSelector = createSelector(
  creatorStateSelector,
  (creaState: CreatorState, prop: { id: number }) => {
    return creaState.articles.filter(el => el.id == prop.id)[0];
  },
);

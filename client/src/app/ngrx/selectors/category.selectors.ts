import { createSelector } from '@ngrx/store';

import { appInitialState, AppState } from '../reducers';

export const appStateSelector = (state: AppState) => (state as AppState) || appInitialState;

export const categoriesSelector = createSelector(
  appStateSelector,
  state => {
    return state.categories;
  },
);

export const categoriesSimpleSelector = createSelector(
  appStateSelector,
  state => {
    return state.categories.map(el => ({ ...el, articles: undefined }));
  },
);

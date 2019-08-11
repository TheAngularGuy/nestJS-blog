import { createSelector } from '@ngrx/store';

import { appInitialState, AppState } from '../reducers';

export const appStateSelector = (state: AppState) => (state as AppState) || appInitialState;

export const authorsSelector = createSelector(
  appStateSelector,
  state => {
    return state.authors;
  },
);

export const authorsSimpleSelector = createSelector(
  appStateSelector,
  state => {
    return state.authors.map(el => ({ ...el, articles: undefined }));
  },
);

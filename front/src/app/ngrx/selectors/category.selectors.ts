import { createSelector } from '@ngrx/store';

import { appInitialState, AppState } from '../reducers';

export const appStateSelector = (state: AppState) => (state as AppState) || appInitialState;

export const categoriesSelector = createSelector(
  appStateSelector,
  state => {
    return state.categories;
  },
);

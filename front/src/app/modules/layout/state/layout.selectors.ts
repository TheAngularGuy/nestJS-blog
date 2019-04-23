import { createSelector } from '@ngrx/store';

import { initialLayoutState, LayoutState } from './layout.reducer';

export const layoutStateSelector = (state: any) => (state.layout as LayoutState) || initialLayoutState;

export const layoutCategoriesSelector = createSelector(
  layoutStateSelector,
  layoutState => {
    return layoutState.categories;
  },
);

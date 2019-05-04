import { createSelector } from '@ngrx/store';

import { AdminState, initialAdminState } from './admin.reducer';

export const adminStateSelector = (state: any) => (state.admin as AdminState) || initialAdminState;

export const categoriesSelector = createSelector(
  adminStateSelector,
  adminState => {
    return adminState.categories;
  },
);

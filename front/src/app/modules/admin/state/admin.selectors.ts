import { createSelector } from '@ngrx/store';

import { AdminState, initialAdminState } from './admin.reducer';

export const adminStateSelector = (state: any) => (state.admin as AdminState) || initialAdminState;

export const usersSelector = createSelector(
  adminStateSelector,
  adminState => {
    return adminState.users;
  },
);

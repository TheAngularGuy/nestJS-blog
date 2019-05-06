import { createSelector } from '@ngrx/store';

import { AdminState, initialAdminState } from './admin.reducer';

export const adminStateSelector = (state: any) => (state.admin as AdminState) || initialAdminState;

export const usersSelector = createSelector(
  adminStateSelector,
  adminState => {
    return adminState.users;
  },
);

export const usersPageSelector = createSelector(
  adminStateSelector,
  adminState => {
    return adminState.page;
  },
);

export const usersTakeSelector = createSelector(
  adminStateSelector,
  adminState => {
    return adminState.take;
  },
);

export const usersCountSelector = createSelector(
  adminStateSelector,
  adminState => {
    return adminState.total;
  },
);

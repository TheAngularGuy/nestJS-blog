import { createSelector } from '@ngrx/store';

import { AuthState, initialAuthState } from './auth.reducer';

export const selectAuthStateSelector = (state: any) => state.auth as AuthState || initialAuthState;

export const isLoggedInSelector = createSelector(selectAuthStateSelector, (authState) => {
  return authState.loggedIn;
});

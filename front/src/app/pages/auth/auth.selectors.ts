import { createSelector } from '@ngrx/store';

import { AuthState, initialAuthState } from './auth.reducer';

export const authStateSelector = (state: any) => state.auth as AuthState || initialAuthState;

export const isLoggedInSelector = createSelector(authStateSelector, (authState) => {
  return authState.loggedIn;
});

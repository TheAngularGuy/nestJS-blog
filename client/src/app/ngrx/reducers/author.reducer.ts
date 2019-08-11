import { UserModel } from 'src/app/models/user.model';

import { AdminActions, AuthorsActionTypes } from '../actions/authors.actions';

export const authorInitialState = null;

export function authorReducer(
  state: UserModel[] = authorInitialState,
  action: AdminActions,
): UserModel[] {
  switch (action.type) {
    case AuthorsActionTypes.LoadAuthorsOK:
      return action.payload.authors;
    default:
      return state;
  }
}

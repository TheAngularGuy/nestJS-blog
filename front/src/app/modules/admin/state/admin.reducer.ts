import { UserModel } from 'src/app/models/user.model';

import { AdminActions } from './admin.actions';

export interface AdminState {
  users: UserModel[];
}

export const initialAdminState: AdminState = {
  users: null,
};

export function reducer(state = initialAdminState, action: AdminActions): AdminState {
  switch (action.type) {
    default:
      return state;
  }
}

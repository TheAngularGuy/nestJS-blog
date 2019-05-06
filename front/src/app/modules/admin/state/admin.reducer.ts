import { UserModel } from 'src/app/models/user.model';

import { AdminActions, AdminActionTypes } from './admin.actions';

export interface AdminState {
  users: UserModel[];
  page: number;
  take: number;
  total: number;
}

export const initialAdminState: AdminState = {
  users: [],
  page: 1,
  take: 10,
  total: 0,
};

export function reducer(state = initialAdminState, action: AdminActions): AdminState {
  switch (action.type) {
    case AdminActionTypes.LoadUsersOK:
      return {
        ...state,
        users: action.payload.users,
        page: action.payload.page,
        take: action.payload.take,
      };
    default:
      return state;
  }
}

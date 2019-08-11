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
    case AdminActionTypes.CountUsersOK:
      return {
        ...state,
        total: action.payload.total,
      };
    case AdminActionTypes.SetAdminUserOK:
      const newListAdmin: UserModel[] = [];
      for (const u of state.users) {
        if (u.id == action.payload.user.id) {
          newListAdmin.push(action.payload.user);
          continue;
        }
        newListAdmin.push(u);
      }
      return {
        ...state,
        users: newListAdmin,
      };
    case AdminActionTypes.SetAuthorUserOK:
      const newListAuthor: UserModel[] = [];
      for (const u of state.users) {
        if (u.id == action.payload.user.id) {
          newListAuthor.push(action.payload.user);
          continue;
        }
        newListAuthor.push(u);
      }
      return {
        ...state,
        users: newListAuthor,
      };
    default:
      return state;
  }
}

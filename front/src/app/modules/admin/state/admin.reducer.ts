import { CategoryModel } from 'src/app/models/category.model';

import { AdminActions, AdminActionTypes } from './admin.actions';

export interface AdminState {
  categories: CategoryModel[];
}

export const initialAdminState: AdminState = {
  categories: null,
};

export function reducer(state = initialAdminState, action: AdminActions): AdminState {
  switch (action.type) {
    case AdminActionTypes.LoadCategoriesOK:
      return {
        ...state,
        categories: action.payload.categories,
      };
    case AdminActionTypes.AddCategorieOK:
      return {
        ...state,
        categories: [action.payload.category, ...state.categories],
      };
    default:
      return state;
  }
}

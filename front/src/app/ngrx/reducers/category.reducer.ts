import { CategoryActions, CategoryActionTypes } from '../actions/category.actions';

export const categoryInitialState = null;

export function categoryReducer(state = categoryInitialState, action: CategoryActions) {
  switch (action.type) {
    case CategoryActionTypes.LoadCategoriesOK:
      return action.payload.categories;
    case CategoryActionTypes.AddCategorieOK:
      return [action.payload.category, ...state];
    default:
      return state;
  }
}

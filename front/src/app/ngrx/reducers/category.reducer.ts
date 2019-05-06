import { CategoryModel } from 'src/app/models/category.model';

import { CategoryActions, CategoryActionTypes } from '../actions/category.actions';

export const categoryInitialState = null;

export function categoryReducer(
  state: CategoryModel[] = categoryInitialState,
  action: CategoryActions,
): CategoryModel[] {
  switch (action.type) {
    case CategoryActionTypes.LoadCategoriesOK:
      return action.payload.categories;
    case CategoryActionTypes.AddCategorieOK:
      return [action.payload.category, ...state];
    case CategoryActionTypes.EditCategorieOK:
      const categoriesEdit: CategoryModel[] = [];
      for (const c of state) {
        if (c.id == action.payload.category.id) {
          categoriesEdit.push(action.payload.category);
        } else {
          categoriesEdit.push(c);
        }
      }
      return categoriesEdit;
    case CategoryActionTypes.DeleteCategorieOK:
      return state.filter(el => el.id != action.payload.category.id);
    default:
      return state;
  }
}

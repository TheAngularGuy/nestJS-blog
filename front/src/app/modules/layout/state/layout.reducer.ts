import { CategoryModel } from 'src/app/models/category.model';

import { LayoutActions, LayoutActionTypes } from './layout.actions';

export interface LayoutState {
  categories: CategoryModel[];
}

export const initialLayoutState: LayoutState = {
  categories: [],
};

export function reducer(state = initialLayoutState, action: LayoutActions): LayoutState {
  switch (action.type) {
    case LayoutActionTypes.LoadCategories:
      return {
        ...state,
        categories: action.payload.list,
      };
    default:
      return state;
  }
}

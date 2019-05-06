import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { CategoryModel } from 'src/app/models/category.model';

import { environment } from '../../../environments/environment';
import { appLogger } from '../loggers/action.logger';
import { categoryInitialState, categoryReducer } from './category.reducer';

export interface AppState {
  // NOTE: this is filled by the lazy loaded modules
  categories: CategoryModel[];
}

export const appInitialState: AppState = {
  categories: categoryInitialState,
};

export const reducers: ActionReducerMap<AppState> = {
  // NOTE: this is filled by the lazy loaded modules
  categories: categoryReducer,
};

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze, environment.stateLogger ? appLogger : x => x]
  : [];

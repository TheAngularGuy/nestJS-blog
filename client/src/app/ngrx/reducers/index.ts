import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { CategoryModel } from 'src/app/models/category.model';
import { UserModel } from 'src/app/models/user.model';

import { environment } from '../../../environments/environment';
import { appLogger } from '../loggers/action.logger';
import { authorInitialState, authorReducer } from './author.reducer';
import { categoryInitialState, categoryReducer } from './category.reducer';

export interface AppState {
  // NOTE: this is filled by the lazy loaded modules
  categories: CategoryModel[];
  authors: UserModel[];
}

export const appInitialState: AppState = {
  categories: categoryInitialState,
  authors: authorInitialState,
};

export const reducers: ActionReducerMap<AppState> = {
  // NOTE: this is filled by the lazy loaded modules
  categories: categoryReducer,
  authors: authorReducer,
};

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze, environment.stateLogger ? appLogger : x => x]
  : [];

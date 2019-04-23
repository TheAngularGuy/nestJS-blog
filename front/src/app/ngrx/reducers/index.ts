import { ActionReducer, ActionReducerMap, MetaReducer, State } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { storeLogger } from 'ngrx-store-logger';

import { environment } from '../../../environments/environment';

function appLogger(reducer: ActionReducer<State<any>>): any {
  // default, no options
  return storeLogger({
    collapsed: true,
  })(reducer);
}

// ----------------------------------------

export class AppState {
  // NOTE: this is filled by the lazy loaded modules
}

export const reducers: ActionReducerMap<AppState> = {
  // NOTE: this is filled by the lazy loaded modules
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [storeFreeze, environment.stateLogger ? appLogger : x => x]
  : [];

import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '../../../environments/environment';


export class AppState {
  // NOTE: this is filled by the lazy loaded modules
}

export const reducers: ActionReducerMap<AppState> = {
  // NOTE: this is filled by the lazy loaded modules
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : [];

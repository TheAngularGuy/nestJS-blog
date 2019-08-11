import { ActionReducer, State } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';

export function appLogger(reducer: ActionReducer<State<any>>): any {
  // default, no options
  return storeLogger({
    collapsed: true,
  })(reducer);
}

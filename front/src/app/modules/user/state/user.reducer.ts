import { Action } from '@ngrx/store';

export interface UserState {}

export const initialUserState: UserState = {};

export function reducer(state = initialUserState, action: Action): UserState {
  switch (action.type) {
    default:
      return state;
  }
}

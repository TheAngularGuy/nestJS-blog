import { Action } from '@ngrx/store';

export interface CreatorState {}

export const initialCreatorState: CreatorState = {};

export function reducer(state = initialCreatorState, action: Action): CreatorState {
  switch (action.type) {
    default:
      return state;
  }
}

import { Action } from '@ngrx/store';

export enum CreatorActionTypes {
  LoadCreators = '[Creator] Load Creators',
  
  
}

export class LoadCreators implements Action {
  readonly type = CreatorActionTypes.LoadCreators;
}


export type CreatorActions = LoadCreators;

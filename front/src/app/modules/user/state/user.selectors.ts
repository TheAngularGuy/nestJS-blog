import { initialUserState, UserState } from './user.reducer';

export const articleStateSelector = (state: any) => (state.creator as UserState) || initialUserState;

/* export const articleListSelector = createSelector(
  articleStateSelector,
  articleState => {
    return articleState.list;
  },
); */

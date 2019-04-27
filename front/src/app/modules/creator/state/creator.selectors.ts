import { CreatorState, initialCreatorState } from './creator.reducer';

export const articleStateSelector = (state: any) =>
  (state.creator as CreatorState) || initialCreatorState;

/* export const articleListSelector = createSelector(
  articleStateSelector,
  articleState => {
    return articleState.list;
  },
); */

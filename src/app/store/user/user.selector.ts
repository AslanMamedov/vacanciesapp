import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUserState } from './user.reducer';
export const userState = createFeatureSelector<IUserState>('user');

export const userSelectorData = createSelector(
  userState,
  (state: IUserState) => state.userData
);
export const userQuestionsSelector = createSelector(
  userState,
  (state: IUserState) => state.userQuestions
);
export const userQuestionsRightCountSelector = createSelector(
  userState,
  (state: IUserState) => state.rightCount
);

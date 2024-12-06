import { createReducer, on } from '@ngrx/store';
import { UserDataActions } from './user.actions';
import { IQuestionData, IUserData } from '#types';

export interface IUserState {
  userData: IUserData | null;
  userQuestions: IQuestionData | null;
  rightCount: number | null;
}

export const initialState: IUserState = {
  userData: null,
  userQuestions: null,
  rightCount: null,
};

export const userReducer = createReducer(
  initialState,
  on(UserDataActions.addUserInfo, (state, { payload }) => ({
    ...state,
    userData: payload,
  })),
  on(UserDataActions.addUserQuestions, (state, { payload }) => {
    let rightCount: number = 0;
    const newData = Object.entries(payload).map(([id, question]) => {
      const right = question.option === question.right;
      if (right) rightCount += 1;
      return [
        id,
        {
          ...question,
          point: right ? 1 : 0,
          rightAnswer: right,
        },
      ];
    });
    const userQuestions = Object.fromEntries(newData);

    return {
      ...state,
      rightCount,
      userQuestions,
    };
  })
);

export type UserStore = typeof userReducer;

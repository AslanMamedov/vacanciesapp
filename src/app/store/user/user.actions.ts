import { IQuestionData, IUserData } from '#types';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const UserDataActions = createActionGroup({
  source: '[UserInfo Component]',
  events: {
    AddUserInfo: props<{ payload: IUserData }>(),
    AddUserQuestions: props<{ payload: IQuestionData }>(),
    QuestionStarted: emptyProps(),
    QuestionFinished: emptyProps(),
    QuestionReset: emptyProps(),
  },
});

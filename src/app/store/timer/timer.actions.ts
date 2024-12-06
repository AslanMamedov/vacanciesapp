import { createActionGroup, emptyProps } from '@ngrx/store';

export const TimerActions = createActionGroup({
  source: '[Timer Component]',
  events: {
    TimerStarted: emptyProps(),
    TimerFinished: emptyProps(),
    TimerReset: emptyProps(),
  },
});

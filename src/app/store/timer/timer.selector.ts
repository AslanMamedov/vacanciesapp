import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TimerState } from './timer.reducer';

export const timerState = createFeatureSelector<TimerState>('timer');

export const timerStartedSelector = createSelector(
  timerState,
  (state: TimerState) => state.questinIsStarted
);

export const timerResetSelector = createSelector(
  timerState,
  (state: TimerState) => state.questinIsReset
);

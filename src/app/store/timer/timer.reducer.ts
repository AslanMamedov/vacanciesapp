import { createReducer, on } from '@ngrx/store';
import { TimerActions } from './timer.actions';

export interface TimerState {
  questinIsStarted: boolean;

  questinIsReset: boolean;
}

export const initialState: TimerState = {
  questinIsStarted: false,

  questinIsReset: false,
};

export const timerReducer = createReducer(
  initialState,
  on(TimerActions.timerStarted, (state) => ({
    ...state,
    questinIsStarted: true,
  })),
  on(TimerActions.timerFinished, (state) => ({
    ...state,
    questinIsStarted: false,
  })),
  on(TimerActions.timerReset, (state) => ({
    ...state,
    questinIsReset: true,
  }))
);

export type TimerStore = typeof timerReducer;

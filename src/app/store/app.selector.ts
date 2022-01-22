import { DataSliceInterface } from './app.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectDataSlice =
  createFeatureSelector<DataSliceInterface>('dataSlice');

export const formGroupSelector = createSelector(selectDataSlice, (state) => {
  return state.myFormGroupState;
});

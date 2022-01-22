import { ValidationErrors } from '@angular/forms';
import { createReducer } from '@ngrx/store';
import {
  createFormGroupState,
  FormGroupState,
  onNgrxForms,
  updateGroup,
  validate,
  wrapReducerWithFormStateUpdate,
} from 'ngrx-forms';
import { required } from 'ngrx-forms/validation';
import { customValidator } from './app.validators';

export interface CustomFormType {
  inputString: string;
}

const FORM_ID = '[APP] FORM ID';

const initialFormState = createFormGroupState<CustomFormType>(FORM_ID, {
  inputString: 'default',
});

const validationReducer = updateGroup<CustomFormType>({
  inputString: validate([required, customValidator]),
});

export interface DataSliceInterface {
  myFormGroupState: FormGroupState<CustomFormType>;
}

const defaultState: DataSliceInterface = {
  myFormGroupState: initialFormState,
};

export const appReducer = createReducer(defaultState, onNgrxForms());

export const appReducerWithValidation = wrapReducerWithFormStateUpdate(
  appReducer,
  (state: DataSliceInterface) => {
    return state.myFormGroupState;
  },
  validationReducer
);

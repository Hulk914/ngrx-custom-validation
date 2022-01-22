import { customMattValidator } from './app.validators';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  ClearAsyncErrorAction,
  SetAsyncErrorAction,
  SetValueAction,
  StartAsyncValidationAction,
} from 'ngrx-forms';
import { of } from 'rxjs';
import { filter, map, startWith, switchMap } from 'rxjs/operators';

@Injectable()
export class AppEffects {
  nameValidation = createEffect(() =>
    this.action$.pipe(
      ofType(SetValueAction.TYPE),
      filter((formControlUpdate: SetValueAction<string>) => {
        return formControlUpdate.controlId === '[APP] FORM ID.inputString';
      }),
      switchMap((formControlUpdate: SetValueAction<string>) => {
        const error = 'customMattError';
        return of(customMattValidator(formControlUpdate.value)).pipe(
          map((err) => {
            return !err
              ? new ClearAsyncErrorAction(formControlUpdate.controlId, error)
              : new SetAsyncErrorAction(
                  formControlUpdate.controlId,
                  error,
                  'mat is not allowed'
                );
          }),
          startWith(
            new StartAsyncValidationAction(formControlUpdate.controlId, error)
          )
        );
      })
    )
  );

  constructor(private action$: Actions) {}
}

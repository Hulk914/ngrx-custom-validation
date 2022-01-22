import { ValidationErrors } from '@angular/forms';

export const customValidator = (
  inputString: string | null | undefined
): ValidationErrors => {
  const errors: ValidationErrors = {};
  if (inputString && inputString.toLowerCase() === 'scooby') {
    errors['customValidator'] = 'scooby not allowed';
  }
  return errors;
};

export const customMattValidator = (
  inputString: string | null | undefined
): ValidationErrors => {
  let errors: ValidationErrors = null;
  if (inputString && inputString.toLowerCase() === 'matt') {
    errors = {};
    errors['customMattValidator'] = 'matt not allowed';
  }
  return errors;
};

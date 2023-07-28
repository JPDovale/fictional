import { ApplicationError } from '@shared/errors/ApplicationError';
import { ValidationError } from 'class-validator';

export function makeValidationErrors(errors: ValidationError[]) {
  const validationError = {
    status: 400,
    error: 'Validation errors',
    message: 'Occurred while validate entry data',
    redirector: {
      isToRedirect: false,
      path: '',
    },
    errors: errors.map(
      (error) =>
        new ApplicationError({
          error: error.toString(),
          value: error.value,
          property: error.property,
          constraints: error.constraints
            ? Object.entries(error.constraints).map(([k, v]) => `${k} => ${v}`)
            : [],
        })
    ),
  };
  return validationError;
}

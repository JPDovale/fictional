import { Response, ResponseProps } from '@shared/res/Response';
import { ValidationError } from 'class-validator';
import { makeValidationErrors } from '@shared/res/MakeValidationErrors';

export class EmptyResponse extends Response<null, EmptyResponse, null>() {
  static create() {
    return new EmptyResponse();
  }

  sendErrorValidation(errors: ValidationError[]): EmptyResponse {
    return new EmptyResponse(makeValidationErrors(errors));
  }

  send(props: ResponseProps<{ nothing: null }>): EmptyResponse {
    return new EmptyResponse({ ...props, data: null });
  }

  parse(nothing: null): null {
    return nothing;
  }
}

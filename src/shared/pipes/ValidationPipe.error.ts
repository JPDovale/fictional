import {
  RequestError,
  RequestErrorProps,
} from '@shared/core/errors/RequestError'
import { StatusCode } from '@shared/core/types/StatusCode'

export class ValidationPipeError extends RequestError {
  constructor(initializer: string | RequestErrorProps) {
    if (initializer instanceof String) {
      super({
        title: initializer.toString(),
        message: initializer.toString(),
        status: StatusCode.BAD_REQUEST,
        details: {},
      })
    }

    if (initializer instanceof Object) {
      super(initializer)
    }
  }
}

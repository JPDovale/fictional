import { ZodError, ZodSchema } from 'zod'
import { fromZodError } from 'zod-validation-error'
import { StatusCode } from '@shared/core/types/StatusCode'
import { ValidationPipeError } from './ValidationPipe.error'

/**
 * @class ZodValidationPipe - A validation pipe
 * It will validate the data request on application.
 */
export class ZodValidationPipe<T> {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown): T {
    try {
      return this.schema.parse(value)
    } catch (err) {
      if (err instanceof ZodError) {
        throw new ValidationPipeError({
          details: { errors: fromZodError(err) },
          message: 'Cant be validate received data',
          title: 'Validation error',
          status: StatusCode.BAD_REQUEST,
        })
      }

      throw new ValidationPipeError('Cant be validate received data')
    }
  }
}

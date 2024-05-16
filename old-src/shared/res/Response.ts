import { ApplicationError } from '@shared/errors/ApplicationError'
import { ValidationError } from 'class-validator'

export interface Redirector {
  isToRedirect: boolean
  path: string
}

export interface ResponseProps<TypeResponseData> {
  status: number
  data?: TypeResponseData | null
  error?: string | null
  errors?: ApplicationError[] | null
  message?: string | null
  redirector?: Redirector
}

/**
 * @type TypeResponseData: final return
 * @type Class: Class what extends this
 * @type TypePrimitiveData: Data without transforms
 */

export function Response<TypeResponseData, Class, TypePrimitiveData>() {
  abstract class Res {
    status: number

    data?: TypeResponseData | null

    error?: string | null

    errors?: ApplicationError[] | null

    message?: string | null

    redirector?: Redirector

    protected constructor(
      props?: ResponseProps<TypeResponseData> | null | undefined,
    ) {
      this.status = props?.status ?? 400
      this.data = props?.data
      this.error = props?.error
      this.message = props?.message
      this.errors = props?.errors
      this.redirector = props?.redirector
    }

    abstract sendErrorValidation(errors: ValidationError[]): Class

    abstract send(
      props: ResponseProps<{ [x: string]: TypePrimitiveData }>,
    ): Class

    abstract parse(
      primitiveData: TypePrimitiveData | null,
    ): TypeResponseData | null
  }

  return Res
}

import { ServiceError } from '@shared/core/error/ServiceError'

export class UserNotFount extends Error implements ServiceError {
  status = 400

  message = 'User not found'

  constructor() {
    super('Resource not found')
  }
}

import { ServiceError } from '@shared/core/error/ServiceError';

export class UserNotFount extends Error implements ServiceError {
  status: number = 400;

  message: string = 'User not found';

  constructor() {
    super('Resource not found');
  }
}

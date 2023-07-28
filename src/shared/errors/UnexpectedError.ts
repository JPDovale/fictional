import { ServiceError } from '@shared/core/error/ServiceError';

export class UnexpectedError extends Error implements ServiceError {
  status: number = 500;

  constructor() {
    super('Unexpected error ocurred');
  }
}

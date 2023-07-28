import { ServiceError } from '@shared/core/error/ServiceError';

export class ResourceNotCreated extends Error implements ServiceError {
  status: number = 400;

  constructor() {
    super('Resource not created');
  }
}

import { ServiceError } from '@shared/core/error/ServiceError';

export class PermissionDenied extends Error implements ServiceError {
  status: number = 401;

  constructor() {
    super('Permission denied');
  }
}

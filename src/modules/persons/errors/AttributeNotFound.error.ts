import { ServiceError } from '@shared/core/errors/SericeError';
import { StatusCode } from '@shared/core/types/StatusCode';

export class AttributeNotFound extends Error implements ServiceError {
  title = 'Attributo não encontrado no sistema';
  status: number = StatusCode.NOT_FOUND;

  constructor() {
    super('Attributo não encontrado no sistema');
  }
}

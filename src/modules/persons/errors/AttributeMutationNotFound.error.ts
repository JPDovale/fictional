import { ServiceError } from '@shared/core/errors/SericeError';
import { StatusCode } from '@shared/core/types/StatusCode';

export class AttributeMutationNotFound extends Error implements ServiceError {
  title = 'Alteração atributo não encontrado no sistema';
  status: number = StatusCode.NOT_FOUND;

  constructor() {
    super('Alteração atributo não encontrado no sistema');
  }
}

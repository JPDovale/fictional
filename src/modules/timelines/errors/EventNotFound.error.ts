import { ServiceError } from '@shared/core/errors/SericeError';
import { StatusCode } from '@shared/core/types/StatusCode';

export class EventNotFound extends Error implements ServiceError {
  title = 'Evento de linha de tempo não encontrado no sistema';
  status: number = StatusCode.NOT_FOUND;

  constructor() {
    super('Evento de linha de tempo não encontrado no sistema');
  }
}

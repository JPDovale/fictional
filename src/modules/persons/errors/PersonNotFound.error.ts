import { ServiceError } from '@shared/core/errors/SericeError'
import { StatusCode } from '@shared/core/types/StatusCode'

export class PersonNotFound extends Error implements ServiceError {
  title = 'Personagem não encontrado no sistema'
  status: number = StatusCode.NOT_FOUND

  constructor() {
    super('Personagem não encontrado no sistema')
  }
}

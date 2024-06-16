import { ServiceError } from '@shared/core/errors/SericeError'
import { StatusCode } from '@shared/core/types/StatusCode'

export class FoundationNotFound extends Error implements ServiceError {
  title = 'Fundação do projecto não encontrada no sistema'
  status: number = StatusCode.NOT_FOUND

  constructor() {
    super('Fundação do projeto nẽo encontrada no sistema')
  }
}

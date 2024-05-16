import { ServiceError } from '@shared/core/errors/SericeError'
import { StatusCode } from '@shared/core/types/StatusCode'

export class MotherNotFound extends Error implements ServiceError {
  title = 'Personagem mãe não encontrado no sistema'
  status: number = StatusCode.NOT_FOUND

  constructor() {
    super('Personagem mãe não encontrado no sistema')
  }
}

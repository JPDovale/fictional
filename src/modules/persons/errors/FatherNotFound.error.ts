import { ServiceError } from '@shared/core/errors/SericeError'
import { StatusCode } from '@shared/core/types/StatusCode'

export class FatherNotFound extends Error implements ServiceError {
  title = 'Personagem pai não encontrado no sistema'
  status: number = StatusCode.NOT_FOUND

  constructor() {
    super('Personagem pai não encontrado no sistema')
  }
}

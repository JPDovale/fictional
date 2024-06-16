import { ServiceError } from '@shared/core/errors/SericeError'
import { StatusCode } from '@shared/core/types/StatusCode'

export class UserNotFound extends Error implements ServiceError {
  title = 'Usuário não encontrado no sistema'
  status: number = StatusCode.NOT_FOUND

  constructor() {
    super('Usuário não encontrado no sistema')
  }
}

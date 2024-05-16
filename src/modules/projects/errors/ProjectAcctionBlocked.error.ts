import { ServiceError } from '@shared/core/errors/SericeError'
import { StatusCode } from '@shared/core/types/StatusCode'

export class ProjectAcctionBlocked extends Error implements ServiceError {
  title = 'Ação não permitida'
  status: number = StatusCode.FORBIDDEN

  constructor() {
    super('A ação no projeto foi bloqueada por falta de permissão')
  }
}

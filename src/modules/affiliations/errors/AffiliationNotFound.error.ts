import { ServiceError } from '@shared/core/errors/SericeError'
import { StatusCode } from '@shared/core/types/StatusCode'

export class AffiliationNotFound extends Error implements ServiceError {
  title = 'Afiliação não encontrada no sistema'
  status: number = StatusCode.NOT_FOUND

  constructor() {
    super('Afiliação não encontrada no sistema')
  }
}

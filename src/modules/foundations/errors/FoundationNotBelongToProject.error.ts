import { ServiceError } from '@shared/core/errors/SericeError'
import { StatusCode } from '@shared/core/types/StatusCode'

export class FoundationNotBelongToProject
  extends Error
  implements ServiceError
{
  title = 'Fundação não pertence ao projeto'
  status: number = StatusCode.FORBIDDEN

  constructor() {
    super('Fundação não pertence ao projeto')
  }
}

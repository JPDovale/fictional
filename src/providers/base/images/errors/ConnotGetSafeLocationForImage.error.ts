import { ServiceError } from '@shared/core/errors/SericeError'
import { StatusCode } from '@shared/core/types/StatusCode'

export class CannotGetSafeLocationForImage
  extends Error
  implements ServiceError
{
  title = 'Local seguro não encontrado.'
  status: number = StatusCode.CONFLICT

  constructor() {
    super('Não foi possível acessar um local seguro para salvar a imagem.')
  }
}

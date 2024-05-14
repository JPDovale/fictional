import { ServiceError } from '@shared/core/errors/SericeError'
import { StatusCode } from '@shared/core/types/StatusCode'

export class ProjectNotImplementsFoundation
  extends Error
  implements ServiceError {
  title = 'Bloco requisitado inválido'
  status: number = StatusCode.FORBIDDEN

  constructor() {
    super(
      'Você está tentando acessar um bloco de construção que o projeto não usa... Tente habilitá-lo na aba de configuraçẽos',
    )
  }
}

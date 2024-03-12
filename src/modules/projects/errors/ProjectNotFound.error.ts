import { ServiceError } from '@shared/core/errors/SericeError'
import { StatusCode } from '@shared/core/types/StatusCode'

export class ProjectNotFound extends Error implements ServiceError {
  title = 'Projeto não encontrado no sistema'
  status: number = StatusCode.NOT_FOUND

  constructor() {
    super('Projeto não encontrado no sistema')
  }
}

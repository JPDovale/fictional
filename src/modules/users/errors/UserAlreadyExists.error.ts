import { ServiceError } from '@shared/core/errors/SericeError'
import { StatusCode } from '@shared/core/types/StatusCode'

export class UserAlreadyExistsWithSameEmail
  extends Error
  implements ServiceError
{
  title = 'Usuário já existe com o mesmo email'
  status: number = StatusCode.CONFLICT

  constructor() {
    super('User already exists with same email')
  }
}

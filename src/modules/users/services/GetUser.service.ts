import { Service } from '@shared/core/contracts/Service'
import { Either, left, right } from '@shared/core/errors/Either'
import { injectable } from 'tsyringe'
import { User } from '../entities/User'
import { UserNotFound } from '../errors/UserNotFound.error'
import { UsersRepository } from '../repositories/Users.repository'

type Request = {
  email: string
}

type PossibleErrors = UserNotFound

type Response = {
  user: User
}

@injectable()
export class GetUserService
  implements Service<Request, PossibleErrors, Response>
{
  constructor(private readonly usersRepository: UsersRepository) { }

  async execute({ email }: Request): Promise<Either<UserNotFound, Response>> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      return left(new UserNotFound())
    }

    return right({ user })
  }
}

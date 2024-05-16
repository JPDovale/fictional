import { Service } from '@shared/core/contracts/Service'
import { Either, left, right } from '@shared/core/errors/Either'
import { injectable } from 'tsyringe'
import { User } from '../entities/User'
import { UsersRepository } from '../repositories/Users.repository'
import { UserAlreadyExistsWithSameEmail } from '../errors/UserAlreadyExists.error'

type Request = {
  name: string
  email: string
}

type PossibleErrors = UserAlreadyExistsWithSameEmail

type Response = {
  user: User
}

@injectable()
export class CreateUserService
  implements Service<Request, PossibleErrors, Response>
{
  constructor(private readonly userRepository: UsersRepository) {}

  async execute({
    name,
    email,
  }: Request): Promise<Either<PossibleErrors, Response>> {
    const _user = await this.userRepository.findByEmail(email)
    if (_user) {
      return left(new UserAlreadyExistsWithSameEmail())
    }

    const user = User.create({
      name,
      email,
    })

    await this.userRepository.create(user)

    return right({ user })
  }
}

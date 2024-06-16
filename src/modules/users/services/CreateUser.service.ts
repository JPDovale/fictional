import { Service } from '@shared/core/contracts/Service'
import { Either, left, right } from '@shared/core/errors/Either'
import { injectable } from 'tsyringe'
import { ImagesLocalManipulatorProvider } from '@providers/base/images/contracts/ImagesLocalManipulator.provider'
import { CannotGetSafeLocationForImage } from '@providers/base/images/errors/ConnotGetSafeLocationForImage.error'
import { User } from '../entities/User'
import { UsersRepository } from '../repositories/Users.repository'
import { UserAlreadyExistsWithSameEmail } from '../errors/UserAlreadyExists.error'

type Request = {
  name: string
  email: string
  photoUrl?: string | null
  accessToken?: string | null
  skipLogin?: boolean
  verified?: boolean
  authId?: string | null
}

type PossibleErrors =
  | UserAlreadyExistsWithSameEmail
  | CannotGetSafeLocationForImage

type Response = {
  user: User
}

@injectable()
export class CreateUserService
  implements Service<Request, PossibleErrors, Response>
{
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly imagesLocalManipulatorProvider: ImagesLocalManipulatorProvider,
  ) {}

  async execute({
    name,
    email,
    authId,
    photoUrl,
    skipLogin,
    accessToken,
    verified,
  }: Request): Promise<Either<PossibleErrors, Response>> {
    const _user = await this.userRepository.findByEmail(email)
    if (_user) {
      return left(new UserAlreadyExistsWithSameEmail())
    }

    const imageSecure = await this.imagesLocalManipulatorProvider.getImage(
      photoUrl ?? '',
    )

    if (photoUrl && !imageSecure) {
      return left(new CannotGetSafeLocationForImage())
    }

    if (photoUrl && imageSecure) {
      await imageSecure.copyToSecure()
    }

    const user = User.create({
      name,
      email,
      authId,
      photoUrl: imageSecure?.savedName ?? null,
      verified,
      skipLogin,
      accessToken,
    })

    await this.userRepository.create(user)

    return right({ user })
  }
}

import { UserNotFound } from '@modules/users/errors/UserNotFound.error'
import { Service } from '@shared/core/contracts/Service'
import { injectable } from 'tsyringe'
import { Either, left, right } from '@shared/core/errors/Either'
import { UsersRepository } from '@modules/users/repositories/Users.repository'
import { ImagesLocalManipulatorProvider } from '@providers/base/images/contracts/ImagesLocalManipulator.provider'
import { CannotGetSafeLocationForImage } from '@providers/base/images/errors/ConnotGetSafeLocationForImage.error'
import { Project } from '../entities/Project'
import { BuildBlock, BuildBlocks } from '../valueObjects/BuildBlocks'
import { ProjectsRepository } from '../repositories/Projects.repository'

type Request = {
  name: string
  image?: string
  buildBlocks: BuildBlock[]
  userId: string
}

type PossibleErrors = UserNotFound | CannotGetSafeLocationForImage

type Response = {
  project: Project
}

@injectable()
export class CreateProjectService
  implements Service<Request, PossibleErrors, Response>
{
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly projectsRepository: ProjectsRepository,
    private readonly imagesLocalManipulatorProvider: ImagesLocalManipulatorProvider,
  ) {}

  async execute({
    name,
    image,
    buildBlocks,
    userId,
  }: Request): Promise<Either<PossibleErrors, Response>> {
    const user = await this.usersRepository.findById(userId)
    if (!user) {
      return left(new UserNotFound())
    }

    const imageSecure = await this.imagesLocalManipulatorProvider.getImage(
      image,
    )

    if (image && !imageSecure) {
      return left(new CannotGetSafeLocationForImage())
    }

    if (image && imageSecure) {
      await imageSecure.copyToSecure()
    }

    const project = Project.create({
      name,
      userId: user.id,
      buildBlocks: BuildBlocks.create(buildBlocks),
      image: imageSecure?.url ?? null,
    })

    await this.projectsRepository.create(project)

    return right({ project })
  }
}

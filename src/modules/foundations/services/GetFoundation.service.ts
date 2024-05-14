import { ProjectNotFound } from '@modules/projects/errors/ProjectNotFound.error'
import { UserNotFound } from '@modules/users/errors/UserNotFound.error'
import { Service } from '@shared/core/contracts/Service'
import { Either, left, right } from '@shared/core/errors/Either'
import { injectable } from 'tsyringe'
import { UsersRepository } from '@modules/users/repositories/Users.repository'
import { ProjectsRepository } from '@modules/projects/repositories/Projects.repository'
import { BuildBlock } from '@modules/projects/valueObjects/BuildBlocks'
import { Foundation } from '../entities/Foundation'
import { FoundationNotFound } from '../errors/FoundationNotFound.error'
import { FoundationsRepository } from '../repositories/Foundations.repository'
import { ProjectNotImplementsFoundation } from '../errors/ProjectNotImplementsFoundation.error'

type Request = {
  userId: string
  projectId: string
}

type PossibleErrors =
  | UserNotFound
  | ProjectNotFound
  | FoundationNotFound
  | ProjectNotImplementsFoundation

type Response = {
  foundation: Foundation
}

@injectable()
export class GetFoundationService
  implements Service<Request, PossibleErrors, Response> {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly projectsRepository: ProjectsRepository,
    private readonly foundationsRepository: FoundationsRepository,
  ) { }

  async execute({
    userId,
    projectId,
  }: Request): Promise<Either<PossibleErrors, Response>> {
    const user = await this.usersRepository.findById(userId)
    if (!user) {
      return left(new UserNotFound())
    }

    const project = await this.projectsRepository.findById(projectId)
    if (!project) {
      return left(new ProjectNotFound())
    }

    const projectImplementFoundation = project.buildBlocks.implements(
      BuildBlock.FOUNDATION,
    )
    if (!projectImplementFoundation) {
      return left(new ProjectNotImplementsFoundation())
    }

    const foundation = await this.foundationsRepository.findByProjectId(
      projectId,
    )
    if (!foundation) {
      return left(new FoundationNotFound())
    }

    return right({ foundation })
  }
}

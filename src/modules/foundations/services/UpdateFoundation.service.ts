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
import { FoundationNotBelongToProject } from '../errors/FoundationNotBelongToProject.error'

type Request = {
  userId: string
  projectId: string
  foundationId: string
  foundation?: string | undefined | null
  whatHappens?: string | undefined | null
  whyHappens?: string | undefined | null
  whereHappens?: string | undefined | null
  whoHappens?: string | undefined | null
}

type PossibleErrors =
  | UserNotFound
  | ProjectNotFound
  | FoundationNotFound
  | ProjectNotImplementsFoundation
  | FoundationNotBelongToProject

type Response = {
  foundation: Foundation
}

@injectable()
export class UpdateFoundationService
  implements Service<Request, PossibleErrors, Response> {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly projectsRepository: ProjectsRepository,
    private readonly foundationsRepository: FoundationsRepository,
  ) { }

  async execute({
    userId,
    projectId,
    foundationId,
    foundation: foundationText,
    whatHappens,
    whyHappens,
    whereHappens,
    whoHappens,
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

    const foundation = await this.foundationsRepository.findById(foundationId)
    if (!foundation) {
      return left(new FoundationNotFound())
    }

    if (!foundation.projectId.equals(project.id)) {
      return left(new FoundationNotBelongToProject())
    }

    foundation.foundation = foundationText
    foundation.whatHappens = whatHappens
    foundation.whyHappens = whyHappens
    foundation.whereHappens = whereHappens
    foundation.whoHappens = whoHappens

    await this.foundationsRepository.save(foundation)

    return right({ foundation })
  }
}

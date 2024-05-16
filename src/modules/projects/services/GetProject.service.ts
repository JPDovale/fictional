import { UserNotFound } from '@modules/users/errors/UserNotFound.error'
import { Service } from '@shared/core/contracts/Service'
import { Either, left, right } from '@shared/core/errors/Either'
import { injectable } from 'tsyringe'
import { UsersRepository } from '@modules/users/repositories/Users.repository'
import { Project } from '../entities/Project'
import { ProjectsRepository } from '../repositories/Projects.repository'
import { ProjectNotFound } from '../errors/ProjectNotFound.error'

type Request = {
  userId: string
  projectId: string
}

type PossibleErrors = UserNotFound | ProjectNotFound

type Response = {
  project: Project
}

@injectable()
export class GetProjectService
  implements Service<Request, PossibleErrors, Response>
{
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly projectsRepository: ProjectsRepository,
  ) {}

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

    return right({ project })
  }
}

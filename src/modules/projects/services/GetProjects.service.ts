import { UserNotFound } from '@modules/users/errors/UserNotFound.error'
import { Service } from '@shared/core/contracts/Service'
import { Either, left, right } from '@shared/core/errors/Either'
import { injectable } from 'tsyringe'
import { UsersRepository } from '@modules/users/repositories/Users.repository'
import { Project } from '../entities/Project'
import { ProjectsRepository } from '../repositories/Projects.repository'

type Request = {
  userId: string
}

type PossibleErrors = UserNotFound

type Response = {
  projects: Project[]
}

@injectable()
export class GetProjectsService
  implements Service<Request, PossibleErrors, Response>
{
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly projectsRepository: ProjectsRepository,
  ) {}

  async execute({ userId }: Request): Promise<Either<UserNotFound, Response>> {
    const user = await this.usersRepository.findById(userId)
    if (!user) {
      return left(new UserNotFound())
    }

    const projects = await this.projectsRepository.findManyByUserId(
      user.id.toString(),
    )

    return right({ projects })
  }
}

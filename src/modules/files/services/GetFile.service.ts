import { UserNotFound } from '@modules/users/errors/UserNotFound.error'
import { Service } from '@shared/core/contracts/Service'
import { injectable } from 'tsyringe'
import { Either, left, right } from '@shared/core/errors/Either'
import { UsersRepository } from '@modules/users/repositories/Users.repository'
import { ProjectNotFound } from '@modules/projects/errors/ProjectNotFound.error'
import { ProjectsRepository } from '@modules/projects/repositories/Projects.repository'
import { ProjectAcctionBlocked } from '@modules/projects/errors/ProjectAcctionBlocked.error'
import { FileNotFound } from '../errors/FileNotFound.error'
import { File } from '../entites/File'
import { FilesRepository } from '../repositories/Files.repository'

type Request = {
  fileId: string
  projectId: string
  userId: string
}

type PossibleErrors =
  | UserNotFound
  | ProjectNotFound
  | ProjectAcctionBlocked
  | FileNotFound

type Response = {
  file: File
}

@injectable()
export class GetFileService
  implements Service<Request, PossibleErrors, Response> {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly projectsRepository: ProjectsRepository,
    private readonly filesRepository: FilesRepository
  ) { }

  async execute({
    projectId,
    userId,
    fileId,
  }: Request): Promise<Either<PossibleErrors, Response>> {
    const user = await this.usersRepository.findById(userId)
    if (!user) {
      return left(new UserNotFound())
    }

    const project = await this.projectsRepository.findById(projectId)
    if (!project) {
      return left(new ProjectNotFound())
    }

    if (!project.userId.equals(user.id)) {
      return left(new ProjectAcctionBlocked())
    }

    const file = await this.filesRepository.findById(fileId)
    if (!file) {
      return left(new FileNotFound())
    }

    if (!file.projectId.equals(project.id)) {
      return left(new ProjectAcctionBlocked())
    }

    return right({ file })
  }
}

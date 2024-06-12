import { UserNotFound } from '@modules/users/errors/UserNotFound.error';
import { Service } from '@shared/core/contracts/Service';
import { injectable } from 'tsyringe';
import { Either, left, right } from '@shared/core/errors/Either';
import { UsersRepository } from '@modules/users/repositories/Users.repository';
import { Project } from '../entities/Project';
import { ProjectsRepository } from '../repositories/Projects.repository';
import { ProjectAcctionBlocked } from '../errors/ProjectAcctionBlocked.error';
import { ProjectNotFound } from '../errors/ProjectNotFound.error';

type Request = {
  userId: string;
  projectId: string;
};

type PossibleErrors = UserNotFound | ProjectNotFound | ProjectAcctionBlocked;

type Response = {
  project: Project;
};

@injectable()
export class DeleteProjectService
  implements Service<Request, PossibleErrors, Response>
{
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly projectsRepository: ProjectsRepository
  ) {}

  async execute({
    userId,
    projectId,
  }: Request): Promise<Either<PossibleErrors, Response>> {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      return left(new UserNotFound());
    }

    const project = await this.projectsRepository.findById(projectId);
    if (!project) {
      return left(new ProjectNotFound());
    }

    if (!project.userId.equals(user.id)) {
      return left(new ProjectAcctionBlocked());
    }

    project.moveToTrash();

    await this.projectsRepository.save(project);

    return right({ project });
  }
}

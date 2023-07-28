import { ProjectsRepository } from '@database/repositories/Project/contracts/ProjectsRepository';
import { UsersRepository } from '@database/repositories/User/contracts/UsersRepository';
import { Project } from '@modules/Projects/models/Project';
import { UserInProject } from '@modules/Projects/models/Project/valueObjects/UserInProject';
import { UserNotFount } from '@modules/Users/services/_errors/UserNotFound';
import InjectableDependencies from '@shared/container/types';
import { Either, left, right } from '@shared/core/error/Either';
import { PermissionDenied } from '@shared/errors/PermissionDenied';
import { ResourceNotFount } from '@shared/errors/ResourceNotFound';
import { inject, injectable } from 'tsyringe';

interface Request {
  projectId: string;
  userId: string;
}

type Response = Promise<
  Either<
    ResourceNotFount | UserNotFount | PermissionDenied,
    { project: Project }
  >
>;

@injectable()
export class GetProjectService {
  constructor(
    @inject(InjectableDependencies.Repositories.ProjectsRepository)
    private readonly projectsRepository: ProjectsRepository,

    @inject(InjectableDependencies.Repositories.UsersRepository)
    private readonly usersRepository: UsersRepository
  ) {}

  async execute({ projectId, userId }: Request): Response {
    const findUserResponse = await this.usersRepository.findById(userId);

    if (!findUserResponse.value || findUserResponse.isLeft()) {
      return left(new UserNotFount());
    }

    const findProjectResponse = await this.projectsRepository.findById(
      projectId
    );

    if (!findProjectResponse.value || findProjectResponse.isLeft()) {
      return left(new ResourceNotFount());
    }

    const user = findUserResponse.value;
    const project = findProjectResponse.value;

    if (!project.userId.equals(user.id)) {
      return left(new PermissionDenied());
    }

    project.creator = UserInProject.createCreator(user);

    return right({ project });
  }
}

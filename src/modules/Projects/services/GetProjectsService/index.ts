import { ProjectsRepository } from '@database/repositories/Project/contracts/ProjectsRepository';
import { UsersRepository } from '@database/repositories/User/contracts/UsersRepository';
import { Project } from '@modules/Projects/models/Project';
import { UserInProject } from '@modules/Projects/models/Project/valueObjects/UserInProject';
import { UserNotFount } from '@modules/Users/services/_errors/UserNotFound';
import InjectableDependencies from '@shared/container/types';
import { Either, left, right } from '@shared/core/error/Either';
import { UnexpectedError } from '@shared/errors/UnexpectedError';
import { inject, injectable } from 'tsyringe';

interface Request {
  userId: string;
}

type Response = Promise<
  Either<
    UserNotFount | UnexpectedError,
    {
      projects: Project[];
    }
  >
>;

@injectable()
export class GetProjectsService {
  constructor(
    @inject(InjectableDependencies.Repositories.UsersRepository)
    private readonly usersRepository: UsersRepository,

    @inject(InjectableDependencies.Repositories.ProjectsRepository)
    private readonly projectsRepository: ProjectsRepository
  ) {}

  async execute({ userId }: Request): Response {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      return left(new UserNotFount());
    }

    const projectsOnDatabase = await this.projectsRepository.findManyByUserId(
      userId
    );

    const projects = projectsOnDatabase.map((project) => {
      const projectCreator = UserInProject.createCreator(user);
      project.creator = projectCreator;
      return project;
    });

    return right({
      projects,
    });
  }
}

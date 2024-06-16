import { UserNotFound } from '@modules/users/errors/UserNotFound.error';
import { Service } from '@shared/core/contracts/Service';
import { Either, left, right } from '@shared/core/errors/Either';
import { injectable } from 'tsyringe';
import { UsersRepository } from '@modules/users/repositories/Users.repository';
import { ProjectNotFound } from '@modules/projects/errors/ProjectNotFound.error';
import { ProjectAcctionBlocked } from '@modules/projects/errors/ProjectAcctionBlocked.error';
import { ProjectsRepository } from '@modules/projects/repositories/Projects.repository';
import { BuildBlock } from '@modules/projects/valueObjects/BuildBlocks';
import { Timeline } from '../entities/Timeline';
import { TimelinesRepository } from '../repositories/Timelines.repository';

type Request = {
  projectId: string;
  userId: string;
};

type PossibleErrors = UserNotFound | ProjectNotFound | ProjectAcctionBlocked;

type Response = {
  timelines: Timeline[];
};

@injectable()
export class GetTimelinesService
  implements Service<Request, PossibleErrors, Response>
{
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly projectsRepository: ProjectsRepository,
    private readonly timelinesRepository: TimelinesRepository
  ) {}

  async execute({
    userId,
    projectId,
  }: Request): Promise<Either<UserNotFound, Response>> {
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

    if (!project.buildBlocks.implements(BuildBlock.TIME_LINES)) {
      return left(new ProjectAcctionBlocked());
    }

    const timelines = await this.timelinesRepository.findManyByProjectId(
      project.id.toString()
    );

    return right({ timelines });
  }
}

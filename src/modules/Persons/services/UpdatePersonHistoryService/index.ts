import { PersonsRepository } from '@database/repositories/Person/contracts/PersonsRepository';
import { ProjectsRepository } from '@database/repositories/Project/contracts/ProjectsRepository';
import { UsersRepository } from '@database/repositories/User/contracts/UsersRepository';
import { Person } from '@modules/Persons/models/Person';
import { UserNotFount } from '@modules/Users/errors/UserNotFound';
import InjectableDependencies from '@shared/container/types';
import { Either, left, right } from '@shared/core/error/Either';
import { PermissionDenied } from '@shared/errors/PermissionDenied';
import { ResourceNotFount } from '@shared/errors/ResourceNotFound';
import { UnexpectedError } from '@shared/errors/UnexpectedError';
import { inject, injectable } from 'tsyringe';

interface Request {
  personId: string;
  projectId: string;
  userId: string;
  history: string | null;
}

type Response = Promise<
  Either<
    ResourceNotFount | UserNotFount | PermissionDenied | UnexpectedError,
    { person: Person }
  >
>;

@injectable()
export class UpdatePersonHistoryService {
  constructor(
    @inject(InjectableDependencies.Repositories.UsersRepository)
    private readonly usersRepository: UsersRepository,

    @inject(InjectableDependencies.Repositories.ProjectsRepository)
    private readonly projectsRepository: ProjectsRepository,

    @inject(InjectableDependencies.Repositories.PersonsRepository)
    private readonly personsRepository: PersonsRepository
  ) {}

  async execute({ history, personId, projectId, userId }: Request): Response {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      return left(new UserNotFount());
    }

    const project = await this.projectsRepository.findById(projectId);
    if (!project) {
      return left(new ResourceNotFount());
    }

    const person = await this.personsRepository.findById(personId);
    if (!person) {
      return left(new ResourceNotFount());
    }

    if (!project.features.featureIsApplied('person')) {
      return left(new UnexpectedError());
    }

    if (!person.userId.equals(user.id) || !project.userId.equals(user.id)) {
      return left(new PermissionDenied());
    }

    person.history = history;

    await this.personsRepository.save(person);

    return right({ person });
  }
}

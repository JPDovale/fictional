import { PersonsRepository } from '@database/repositories/Person/contracts/PersonsRepository';
import { ProjectsRepository } from '@database/repositories/Project/contracts/ProjectsRepository';
import { UsersRepository } from '@database/repositories/User/contracts/UsersRepository';
import { Person } from '@modules/Persons/models/Person';
import { UserNotFount } from '@modules/Users/services/_errors/UserNotFound';
import InjectableDependencies from '@shared/container/types';
import { Either, left, right } from '@shared/core/error/Either';
import { ResourceNotCreated } from '@shared/errors/ResourceNotCreated';
import { ResourceNotFount } from '@shared/errors/ResourceNotFound';
import { UnexpectedError } from '@shared/errors/UnexpectedError';
import { inject, injectable } from 'tsyringe';
import { ImageProvider } from '@providers/base/Image/contracts/ImageProvider';

interface Request {
  userId: string;
  projectId: string;
  bookId?: string;
  name?: string;
  biographic: string;
  lastName?: string;
  age?: number;
  history?: string;
  imageUrl?: string;
}

type Response = Promise<
  Either<
    ResourceNotCreated | ResourceNotFount | UserNotFount | UnexpectedError,
    { person: Person }
  >
>;

@injectable()
export class CreatePersonService {
  constructor(
    @inject(InjectableDependencies.Repositories.UsersRepository)
    private readonly usersRepository: UsersRepository,

    @inject(InjectableDependencies.Repositories.ProjectsRepository)
    private readonly projectsRepository: ProjectsRepository,

    @inject(InjectableDependencies.Repositories.PersonsRepository)
    private readonly personsRepository: PersonsRepository,

    @inject(InjectableDependencies.Providers.ImageProvider)
    private readonly imageProvider: ImageProvider
  ) {}

  async execute({
    projectId,
    userId,
    name,
    biographic,
    lastName,
    age,
    imageUrl,
    history,
  }: Request): Response {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      return left(new UserNotFount());
    }

    const project = await this.projectsRepository.findById(projectId);
    if (!project) {
      return left(new ResourceNotFount());
    }

    if (!project.features.featureIsApplied('person')) {
      return left(new UnexpectedError());
    }

    const secureImageUrl = await this.imageProvider.getSecurePath(
      imageUrl ?? null
    );

    const person = Person.create({
      name,
      biographic,
      lastName,
      age,
      history,
      projectId: project.id,
      userId: user.id,
      imageUrl: secureImageUrl,
    });

    await this.personsRepository.create(person);

    return right({ person });
  }
}

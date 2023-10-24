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
import fs from 'fs/promises';
import path from 'path';
import { getDatabaseImagesPath } from '@config/files/getDatabasePath';
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId';

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
    private readonly personsRepository: PersonsRepository
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

    if (!project.features.featureIsApplied('person')) {
      return left(new UnexpectedError());
    }

    let dest: string | null = null;

    if (imageUrl) {
      const destination = path.join(
        getDatabaseImagesPath(),
        new UniqueEntityId().toString().concat(path.basename(imageUrl))
      );

      await fs.copyFile(imageUrl, destination);

      dest = destination;
    }

    const person = Person.create({
      name,
      biographic,
      lastName,
      age,
      history,
      projectId: project.id,
      userId: user.id,
      imageUrl: dest && process.platform === 'linux' ? `file://${dest}` : dest,
    });

    await this.personsRepository.create(person);

    return right({ person });
  }
}

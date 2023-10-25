import { BooksRepository } from '@database/repositories/Book/contracts/BooksRepository';
import { ProjectsRepository } from '@database/repositories/Project/contracts/ProjectsRepository';
import { SnowflakeStructuresRepository } from '@database/repositories/SnowflakeStructure/contracts/SnowflakeStructuresRepository';
import { UsersRepository } from '@database/repositories/User/contracts/UsersRepository';
import { Person } from '@modules/Persons/models/Person';
import { PersonSnowflakeStructureBase } from '@modules/Persons/models/Person/valueObjects/PersonSnowflakeStructureBase';
import { SnowflakeStructurePersonList } from '@modules/SnowflakeStructures/models/SnowflakeStructurePersonList';
import { UserNotFount } from '@modules/Users/services/_errors/UserNotFound';
import InjectableDependencies from '@shared/container/types';
import { Either, left, right } from '@shared/core/error/Either';
import { ResourceNotCreated } from '@shared/errors/ResourceNotCreated';
import { ResourceNotFount } from '@shared/errors/ResourceNotFound';
import { UnexpectedError } from '@shared/errors/UnexpectedError';
import { inject, injectable } from 'tsyringe';

interface Request {
  userId: string;
  projectId: string;
  bookId: string;
  name: string;
  lastName?: string;
  imageUrl?: string;
}

type Response = Promise<
  Either<
    ResourceNotCreated | ResourceNotFount | UserNotFount | UnexpectedError,
    { person: Person }
  >
>;

@injectable()
export class CreatePersonWithSnowflakeStructureService {
  constructor(
    @inject(InjectableDependencies.Repositories.UsersRepository)
    private readonly usersRepository: UsersRepository,

    @inject(InjectableDependencies.Repositories.ProjectsRepository)
    private readonly projectsRepository: ProjectsRepository,

    @inject(InjectableDependencies.Repositories.BooksRepository)
    private readonly booksRepository: BooksRepository,

    @inject(InjectableDependencies.Repositories.SnowflakeStructuresRepository)
    private readonly snowflakeStructuresRepository: SnowflakeStructuresRepository
  ) {}

  async execute({
    projectId,
    userId,
    name,
    lastName,
    imageUrl,
    bookId,
  }: Request): Response {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      return left(new UserNotFount());
    }

    const project = await this.projectsRepository.findById(projectId);
    if (!project) {
      return left(new ResourceNotFount());
    }

    const book = await this.booksRepository.findById(bookId);
    if (!book) {
      return left(new ResourceNotFount());
    }

    const { snowflakeStructureId } = book;

    if (
      !project.features.featureIsApplied('person') ||
      project.structure !== 'snowflake' ||
      !snowflakeStructureId
    ) {
      return left(new UnexpectedError());
    }

    const snowflakeStructure =
      await this.snowflakeStructuresRepository.findById(
        snowflakeStructureId.toString()
      );
    if (!snowflakeStructure) {
      return left(new ResourceNotFount());
    }

    const person = Person.create({
      name,
      lastName,
      projectId: project.id,
      userId: user.id,
      imageUrl,
      snowflakeStructureBase: PersonSnowflakeStructureBase.create({}),
    });

    snowflakeStructure.persons = new SnowflakeStructurePersonList();
    snowflakeStructure.persons.add(person);

    await this.snowflakeStructuresRepository.save(snowflakeStructure);

    return right({ person });
  }
}

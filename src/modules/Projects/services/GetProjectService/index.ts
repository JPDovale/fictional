import { BooksRepository } from '@database/repositories/Book/contracts/BooksRepository';
import { PersonsRepository } from '@database/repositories/Person/contracts/PersonsRepository';
import { ProjectsRepository } from '@database/repositories/Project/contracts/ProjectsRepository';
import { SnowflakeStructuresRepository } from '@database/repositories/SnowflakeStructure/contracts/SnowflakeStructuresRepository';
import { ThreeActsStructuresRepository } from '@database/repositories/ThreeActsStructure/contracts/ThreeActsStructuresRepository';
import { UsersRepository } from '@database/repositories/User/contracts/UsersRepository';
// import { Person } from '@modules/Persons/models/Person';
import { Project } from '@modules/Projects/models/Project';
import { UserInProject } from '@modules/Projects/models/Project/valueObjects/UserInProject';
import { ProjectBookList } from '@modules/Projects/models/ProjectBookList';
import { ProjectPersonList } from '@modules/Projects/models/ProjectPersonList';
import { SnowflakeStructure } from '@modules/SnowflakeStructures/models/SnowflakeStructure';
// import { SnowflakeStructurePersonList } from '@modules/SnowflakeStructures/models/SnowflakeStructurePersonList';
import { ThreeActsStructure } from '@modules/ThreeActsStructures/models/ThreeActsStructure';
import { UserNotFount } from '@modules/Users/services/_errors/UserNotFound';
import InjectableDependencies from '@shared/container/types';
import { Either, left, right } from '@shared/core/error/Either';
import { PermissionDenied } from '@shared/errors/PermissionDenied';
import { ResourceNotFount } from '@shared/errors/ResourceNotFound';
import { UnexpectedError } from '@shared/errors/UnexpectedError';
import { inject, injectable } from 'tsyringe';

interface Request {
  projectId: string;
  userId: string;
}

type Response = Promise<
  Either<
    ResourceNotFount | UserNotFount | PermissionDenied | UnexpectedError,
    { project: Project }
  >
>;

@injectable()
export class GetProjectService {
  constructor(
    @inject(InjectableDependencies.Repositories.ProjectsRepository)
    private readonly projectsRepository: ProjectsRepository,

    @inject(InjectableDependencies.Repositories.UsersRepository)
    private readonly usersRepository: UsersRepository,

    @inject(InjectableDependencies.Repositories.BooksRepository)
    private readonly booksRepository: BooksRepository,

    @inject(InjectableDependencies.Repositories.PersonsRepository)
    private readonly personsRepository: PersonsRepository,

    @inject(InjectableDependencies.Repositories.ThreeActsStructuresRepository)
    private readonly threeActsStructuresRepository: ThreeActsStructuresRepository,

    @inject(InjectableDependencies.Repositories.SnowflakeStructuresRepository)
    private readonly snowflakeStructuresRepository: SnowflakeStructuresRepository
  ) {}

  async execute({ projectId, userId }: Request): Response {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      return left(new UserNotFount());
    }

    const project = await this.projectsRepository.findById(projectId);
    if (!project) {
      return left(new ResourceNotFount());
    }

    if (!project.userId.equals(user.id)) {
      return left(new PermissionDenied());
    }

    const persons = await this.personsRepository.findByProjectId(
      project.id.toString()
    );

    project.persons = new ProjectPersonList(persons);

    const books = await this.booksRepository.findByProjectId(
      project.id.toString()
    );

    const findThreeActsOfBooks: Array<Promise<ThreeActsStructure | null>> = [];
    const findSnowflakeOfBooks: Array<Promise<SnowflakeStructure | null>> = [];

    books.forEach((book) => {
      if (book.structure === 'three-acts') {
        findThreeActsOfBooks.push(
          this.threeActsStructuresRepository.findById(
            book.threeActsStructureId!.toString()
          )
        );
      }

      if (book.structure === 'snowflake') {
        findSnowflakeOfBooks.push(
          this.snowflakeStructuresRepository.findById(
            book.snowflakeStructureId!.toString()
          )
        );
      }
    });

    const threeActsStructures = await Promise.all(findThreeActsOfBooks);
    // const snowflakeStructuresResponses = await Promise.all(
    //   findSnowflakeOfBooks
    // );

    threeActsStructures.forEach((TAS) => {
      if (!TAS) return;

      books.forEach((b) => {
        if (b.threeActsStructureId?.equals(TAS.id)) {
          b.threeActsStructure = TAS;
        }
      });
    });

    // eslint-disable-next-line no-restricted-syntax
    // for (const SFRes of snowflakeStructuresResponses) {
    //   if (SFRes.isRight() && SFRes.value) {
    //     const SFS = SFRes.value;
    //     const implementorIndex = books.findIndex((b) =>
    //       b.id.equals(SFS.implementorId)
    //     );
    //     const personsThisSFSResponse =
    //       // eslint-disable-next-line no-await-in-loop
    //       await this.personsRepository.findBySnowflakeStructureId(
    //         SFS.id.toString()
    //       );
    //     const personsThisSFS: Person[] = [];

    //     if (personsThisSFSResponse.isRight()) {
    //       personsThisSFSResponse.value.forEach((person) =>
    //         personsThisSFS.push(person)
    //       );
    //     }

    //     SFS.persons = new SnowflakeStructurePersonList(personsThisSFS);
    //     books[implementorIndex].snowflakeStructure = SFS;
    //   }
    // }

    project.books = new ProjectBookList(books);

    project.creator = UserInProject.createCreator(user);

    return right({ project });
  }
}

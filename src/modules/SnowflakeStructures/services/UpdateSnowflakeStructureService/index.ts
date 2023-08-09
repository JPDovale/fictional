import { BooksRepository } from '@database/repositories/Book/contracts/BooksRepository';
import { ProjectsRepository } from '@database/repositories/Project/contracts/ProjectsRepository';
import { SnowflakeStructuresRepository } from '@database/repositories/SnowflakeStructure/contracts/SnowflakeStructuresRepository';
import { UsersRepository } from '@database/repositories/User/contracts/UsersRepository';
import { ProjectBookList } from '@modules/Projects/models/ProjectBookList';
import { UserNotFount } from '@modules/Users/services/_errors/UserNotFound';
import InjectableDependencies from '@shared/container/types';
import { Either, left, right } from '@shared/core/error/Either';
import { PermissionDenied } from '@shared/errors/PermissionDenied';
import { ResourceNotFount } from '@shared/errors/ResourceNotFound';
import { UnexpectedError } from '@shared/errors/UnexpectedError';
import { inject, injectable } from 'tsyringe';

interface Request {
  userId: string;
  projectId: string;
  bookId?: string;
  centralIdia?: string | null;
  phrase1?: string | null;
  phrase2?: string | null;
  phrase3?: string | null;
  phrase4?: string | null;
  phrase5?: string | null;
  paragraph1?: string | null;
  paragraph2?: string | null;
  paragraph3?: string | null;
  paragraph4?: string | null;
  paragraph5?: string | null;
}

type Response = Promise<
  Either<
    ResourceNotFount | UserNotFount | UnexpectedError | PermissionDenied,
    {}
  >
>;

@injectable()
export class UpdateSnowflakeStructureService {
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
    bookId,
    centralIdia,
    phrase1,
    phrase2,
    phrase3,
    phrase4,
    phrase5,
    paragraph1,
    paragraph2,
    paragraph3,
    paragraph4,
    paragraph5,
  }: Request): Response {
    const findUserResponse = await this.usersRepository.findById(userId);
    if (!findUserResponse.value || findUserResponse.isLeft())
      return left(new UserNotFount());

    const findProjectResponse = await this.projectsRepository.findById(
      projectId
    );
    if (!findProjectResponse.value || findProjectResponse.isLeft()) {
      return left(new ResourceNotFount());
    }

    const user = findUserResponse.value;
    const project = findProjectResponse.value;
    let bookIdStructureToUpdate: string;

    if (!project.userId.equals(user.id)) {
      return left(new PermissionDenied());
    }

    if (project.structure !== 'snowflake') {
      return left(new UnexpectedError());
    }

    if (project.features.featureIsApplied('multi-book')) {
      if (!bookId) return left(new UnexpectedError());

      bookIdStructureToUpdate = bookId;
    } else {
      const findBooksResponse = await this.booksRepository.findByProjectId(
        project.id.toString()
      );
      if (findBooksResponse.isRight() && findBooksResponse.value.length === 1) {
        const books = findBooksResponse.value;
        project.books = new ProjectBookList(books);

        bookIdStructureToUpdate = books[0].id.toString();
      } else {
        return left(new UnexpectedError());
      }
    }

    const findBookResponse = await this.booksRepository.findById(
      bookIdStructureToUpdate
    );
    if (!findBookResponse.value || findBookResponse.isLeft()) {
      return left(new ResourceNotFount());
    }

    const book = findBookResponse.value;
    const { snowflakeStructureId } = book;

    if (!snowflakeStructureId) {
      return left(new UnexpectedError());
    }

    const findSnowflakeStructureResponse =
      await this.snowflakeStructuresRepository.findById(
        snowflakeStructureId.toString()
      );
    if (
      !findSnowflakeStructureResponse.value ||
      findSnowflakeStructureResponse.isLeft()
    ) {
      return left(new ResourceNotFount());
    }

    const snowflakeStructure = findSnowflakeStructureResponse.value;

    snowflakeStructure.centralIdia = centralIdia;
    snowflakeStructure.expansionToParagraph = {
      phrase1,
      phrase2,
      phrase3,
      phrase4,
      phrase5,
    };
    snowflakeStructure.expansionToPage = {
      paragraph1,
      paragraph2,
      paragraph3,
      paragraph4,
      paragraph5,
    };

    const saveSnowflakeStructureResponse =
      await this.snowflakeStructuresRepository.save(snowflakeStructure);
    if (saveSnowflakeStructureResponse.isLeft()) {
      return left(new UnexpectedError());
    }

    return right({});
  }
}

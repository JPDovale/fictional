import { BooksRepository } from '@database/repositories/Book/contracts/BooksRepository';
import { ProjectsRepository } from '@database/repositories/Project/contracts/ProjectsRepository';
import { UsersRepository } from '@database/repositories/User/contracts/UsersRepository';
import { Book } from '@modules/Books/models/Book';
import { UserNotFount } from '@modules/Users/services/_errors/UserNotFound';
import InjectableDependencies from '@shared/container/types';
import { Either, left, right } from '@shared/core/error/Either';
import { PermissionDenied } from '@shared/errors/PermissionDenied';
import { ResourceNotFount } from '@shared/errors/ResourceNotFound';
import { UnexpectedError } from '@shared/errors/UnexpectedError';
import { inject, injectable } from 'tsyringe';

interface Request {
  bookId: string;
  projectId: string;
  userId: string;
  text: string | null;
}

type Response = Promise<
  Either<
    ResourceNotFount | UserNotFount | PermissionDenied | UnexpectedError,
    { book: Book }
  >
>;

@injectable()
export class UpdateBookTextService {
  constructor(
    @inject(InjectableDependencies.Repositories.UsersRepository)
    private readonly usersRepository: UsersRepository,

    @inject(InjectableDependencies.Repositories.ProjectsRepository)
    private readonly projectsRepository: ProjectsRepository,

    @inject(InjectableDependencies.Repositories.BooksRepository)
    private readonly booksRepository: BooksRepository
  ) {}

  async execute({ bookId, text, projectId, userId }: Request): Response {
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

    const findBookResponse = await this.booksRepository.findById(bookId);
    if (!findBookResponse.value || findBookResponse.isLeft()) {
      return left(new ResourceNotFount());
    }

    const user = findUserResponse.value;
    const project = findProjectResponse.value;
    const book = findBookResponse.value;

    if (project.type !== 'book') {
      return left(new UnexpectedError());
    }

    if (!book.userId.equals(user.id) || !project.userId.equals(user.id)) {
      return left(new PermissionDenied());
    }

    book.text = text;

    const updateHistoryResponse = await this.booksRepository.save(book);

    if (updateHistoryResponse.isLeft()) {
      return left(new UnexpectedError());
    }

    return right({ book });
  }
}

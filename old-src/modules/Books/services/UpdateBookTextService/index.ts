import { BooksRepository } from '@database/repositories/Book/contracts/BooksRepository';
import { ProjectsRepository } from '@database/repositories/Project/contracts/ProjectsRepository';
import { UsersRepository } from '@database/repositories/User/contracts/UsersRepository';
import { Book } from '@modules/Books/models/Book';
import { UserNotFount } from '@modules/Users/errors/UserNotFound';
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

    if (project.type !== 'book') {
      return left(new UnexpectedError());
    }

    book.text = text;

    await this.booksRepository.save(book);

    return right({ book });
  }
}

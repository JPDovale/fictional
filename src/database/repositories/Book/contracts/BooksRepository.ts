import { Book } from '@modules/Books/models/Book';
import { Either } from '@shared/core/error/Either';

export abstract class BooksRepository {
  abstract create(book: Book): Promise<Either<{}, {}>>;

  abstract createMany(books: Book[]): Promise<Either<{}, {}>>;

  abstract findById(id: string): Promise<Either<{}, Book | null>>;

  abstract findByProjectId(projectId: string): Promise<Either<{}, Book[]>>;
}

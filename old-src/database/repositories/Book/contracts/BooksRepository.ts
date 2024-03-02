import { Book } from '@modules/Books/models/Book';

export abstract class BooksRepository {
  abstract create(book: Book): Promise<void>;

  abstract createMany(books: Book[]): Promise<void>;

  abstract findById(id: string): Promise<Book | null>;

  abstract findByProjectId(projectId: string): Promise<Book[]>;

  abstract save(book: Book): Promise<void>;
}

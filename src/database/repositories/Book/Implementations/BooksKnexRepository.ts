import { Book } from '@modules/Books/models/Book';
import { Either, left, right } from '@shared/core/error/Either';
import { db } from '@database/index';
import { BooksRepository } from '../contracts/BooksRepository';
import { BooksKnexMapper } from './BooksKnexMapper';

export class BooksKnexRepository implements BooksRepository {
  async create(book: Book): Promise<Either<{}, {}>> {
    try {
      await db('books').insert(BooksKnexMapper.toKnex(book));
      return right({});
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  createMany(books: Book[]): Promise<Either<{}, {}>> {
    throw new Error('Method not implemented.');
  }

  findById(id: string): Promise<Either<{}, Book | null>> {
    throw new Error('Method not implemented.');
  }

  findByProjectId(projectId: string): Promise<Either<{}, Book[]>> {
    throw new Error('Method not implemented.');
  }

  save(book: Book): Promise<Either<{}, {}>> {
    throw new Error('Method not implemented.');
  }
}

import { Book } from '@modules/Books/models/Book';
import { Either, left, right } from '@shared/core/error/Either';
import { db } from '@database/index';
import { inject, injectable } from 'tsyringe';
import InjectableDependencies from '@shared/container/types';
import { ThreeActsStructuresRepository } from '@database/repositories/ThreeActsStructure/contracts/ThreeActsStructuresRepository';
import { BooksKnexMapper } from './BooksKnexMapper';
import { BooksRepository } from '../contracts/BooksRepository';

@injectable()
export class BooksKnexRepository implements BooksRepository {
  constructor(
    @inject(InjectableDependencies.Repositories.ThreeActsStructuresRepository)
    private readonly threeActsStructuresRepository: ThreeActsStructuresRepository
  ) {}

  async create(book: Book): Promise<Either<{}, {}>> {
    try {
      await db('books').insert(BooksKnexMapper.toKnex(book));

      if (book.threeActsStructure) {
        await this.threeActsStructuresRepository.create(
          book.threeActsStructure
        );
      }

      return right({});
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async createMany(books: Book[]): Promise<Either<{}, {}>> {
    try {
      await Promise.all(
        books.map((book) => db('books').insert(BooksKnexMapper.toKnex(book)))
      );

      await Promise.all(
        books.map(
          (book) =>
            book.threeActsStructure &&
            this.threeActsStructuresRepository.create(book.threeActsStructure)
        )
      );

      return right({});
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async findById(id: string): Promise<Either<{}, Book | null>> {
    try {
      const book = await db('books').where({ id }).first();

      if (!book) return right(null);

      return right(BooksKnexMapper.toEntity(book));
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async findByProjectId(projectId: string): Promise<Either<{}, Book[]>> {
    try {
      const books = await db('books').where({ project_id: projectId });
      return right(books.map(BooksKnexMapper.toEntity));
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async save(book: Book): Promise<Either<{}, {}>> {
    try {
      await db('books')
        .where({ id: book.id.toString() })
        .update(BooksKnexMapper.toKnex(book));
      return right({});
    } catch (err) {
      console.log(err);
      return left({});
    }
  }
}

import { Book } from '@modules/Books/models/Book';
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

  async create(book: Book): Promise<void> {
    await db('books').insert(BooksKnexMapper.toKnex(book));

    if (book.threeActsStructure) {
      await this.threeActsStructuresRepository.create(book.threeActsStructure);
    }
  }

  async createMany(books: Book[]): Promise<void> {
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
  }

  async findById(id: string): Promise<Book | null> {
    const book = await db('books').where({ id }).first();

    if (!book) return null;

    return BooksKnexMapper.toEntity(book);
  }

  async findByProjectId(projectId: string): Promise<Book[]> {
    const books = await db('books').where({ project_id: projectId });
    return books.map(BooksKnexMapper.toEntity);
  }

  async save(book: Book): Promise<void> {
    book.touch();
    await db('books')
      .where({ id: book.id.toString() })
      .update(BooksKnexMapper.toKnex(book));
  }
}

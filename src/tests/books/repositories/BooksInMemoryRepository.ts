import { BooksRepository } from '@database/repositories/Book/contracts/BooksRepository';
import { BookFile } from '@database/repositories/Book/types';
import { SnowflakeStructuresRepository } from '@database/repositories/SnowflakeStructure/contracts/SnowflakeStructuresRepository';
import { ThreeActsStructuresRepository } from '@database/repositories/ThreeActsStructure/contracts/ThreeActsStructuresRepository';
import { Book } from '@modules/Books/models/Book';
import { Either, left, right } from '@shared/core/error/Either';

export class BooksInMemoryRepository implements BooksRepository {
  constructor(
    private readonly threeActsStructuresRepository: ThreeActsStructuresRepository,
    private readonly snowflakeStructuresRepository: SnowflakeStructuresRepository
  ) {}

  private booksList: BookFile[] = [];

  get books() {
    return this.booksList;
  }

  async create(book: Book): Promise<Either<{}, {}>> {
    try {
      if (book.threeActsStructure) {
        await this.threeActsStructuresRepository.create(
          book.threeActsStructure
        );
      }

      if (book.snowflakeStructure) {
        await this.snowflakeStructuresRepository.create(
          book.snowflakeStructure
        );
      }

      this.booksList.push(BooksRepository.parserToFile(book));

      return right({});
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async createMany(books: Book[]): Promise<Either<{}, {}>> {
    try {
      books.forEach((book) =>
        this.booksList.push(BooksRepository.parserToFile(book))
      );
      return right({});
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async findById(id: string): Promise<Either<{}, Book | null>> {
    try {
      const book = this.booksList.find((b) => b.id === id);
      return right(book ? BooksRepository.parser(book) : null);
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async findByProjectId(id: string): Promise<Either<{}, Book[]>> {
    try {
      const books = this.booksList.filter((b) => b.project_id === id);
      return right(books.map((book) => BooksRepository.parser(book)));
    } catch (err) {
      console.log(err);
      return left({});
    }
  }
}

import { BooksRepository } from '@database/repositories/Book/contracts/BooksRepository';
import { ThreeActsStructuresRepository } from '@database/repositories/ThreeActsStructure/contracts/ThreeActsStructuresRepository';
import { Book } from '@modules/Books/models/Book';
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId';
import { Either, left, right } from '@shared/core/error/Either';

export class BooksInMemoryRepository implements BooksRepository {
  constructor(
    private readonly threeActsStructuresRepository: ThreeActsStructuresRepository
  ) {}

  private booksList: Book[] = [];

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

      this.booksList.push(book);

      return right({});
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async createMany(books: Book[]): Promise<Either<{}, {}>> {
    try {
      books.forEach((book) => this.booksList.push(book));
      return right({});
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async findById(id: string): Promise<Either<{}, Book | null>> {
    try {
      const book = this.booksList.find((b) =>
        b.id.equals(new UniqueEntityId(id))
      );
      return right(book ?? null);
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async findByProjectId(id: string): Promise<Either<{}, Book[]>> {
    try {
      const books = this.booksList.filter((b) =>
        b.projectId.equals(new UniqueEntityId(id))
      );

      return right(books);
    } catch (err) {
      console.log(err);
      return left({});
    }
  }
}

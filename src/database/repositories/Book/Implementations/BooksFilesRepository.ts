import { Book } from '@modules/Books/models/Book';
import { Either, left, right } from '@shared/core/error/Either';
import fs from 'node:fs';
import { dataDirs, dataFiles } from '@config/files';
import { inject, injectable } from 'tsyringe';
import InjectableDependencies from '@shared/container/types';
import { ThreeActsStructuresRepository } from '@database/repositories/ThreeActsStructure/contracts/ThreeActsStructuresRepository';
import { SnowflakeStructuresRepository } from '@database/repositories/SnowflakeStructure/contracts/SnowflakeStructuresRepository';
import { BooksRepository } from '../contracts/BooksRepository';
import { BooksToProjectRepository } from '../contracts/BooksToProjectRepository';
import { BooksToUserRepository } from '../contracts/BooksToUserRepository';
import { BookFile } from '../types';

@injectable()
export class BooksFilesRepository implements BooksRepository {
  constructor(
    @inject(InjectableDependencies.Repositories.BooksToProjectRepository)
    private readonly booksToProjectRepository: BooksToProjectRepository,

    @inject(InjectableDependencies.Repositories.BooksToUserRepository)
    private readonly booksToUserRepository: BooksToUserRepository,

    @inject(InjectableDependencies.Repositories.ThreeActsStructuresRepository)
    private readonly threeActsStructuresRepository: ThreeActsStructuresRepository,

    @inject(InjectableDependencies.Repositories.SnowflakeStructuresRepository)
    private readonly snowflakeStructuresRepository: SnowflakeStructuresRepository
  ) {}

  async create(book: Book): Promise<Either<{}, {}>> {
    try {
      const bookFile: BookFile = BooksRepository.parserToFile(book);

      if (!fs.existsSync(dataDirs.books)) {
        fs.mkdirSync(dataDirs.books);
      }

      fs.writeFileSync(
        dataFiles.book(book.id.toString()),
        JSON.stringify(bookFile, null, 2)
      );

      await this.booksToProjectRepository.createOrAdd({
        bookId: book.id.toString(),
        projectId: book.projectId.toString(),
      });

      await this.booksToUserRepository.createOrAdd({
        bookId: book.id.toString(),
        userId: book.userId.toString(),
      });

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

      return right({});
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async createMany(books: Book[]): Promise<Either<{}, {}>> {
    try {
      // eslint-disable-next-line no-restricted-syntax
      for (const book of books) {
        // eslint-disable-next-line no-await-in-loop
        await this.create(book);
      }

      return right({});
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async findById(id: string): Promise<Either<{}, Book | null>> {
    try {
      if (fs.existsSync(dataFiles.book(id))) {
        const bookReceived = fs.readFileSync(dataFiles.book(id), 'utf-8');
        const bookFile: BookFile | null = bookReceived.includes(id)
          ? JSON.parse(bookReceived)
          : null;
        const book = bookFile ? BooksRepository.parser(bookFile) : null;

        return right(book);
      }

      return right(null);
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async findByProjectId(projectId: string): Promise<Either<{}, Book[]>> {
    try {
      const getBooksIdsResponse =
        await this.booksToProjectRepository.getBooksIdsPerProject(projectId);

      if (getBooksIdsResponse.isRight()) {
        const booksIds = getBooksIdsResponse.value;
        const books: Book[] = [];

        booksIds.forEach((bookId) => {
          if (fs.existsSync(dataFiles.book(bookId))) {
            const bookFileReceived = fs.readFileSync(
              dataFiles.book(bookId),
              'utf-8'
            );
            const bookFile: BookFile = JSON.parse(bookFileReceived);
            const book = BooksRepository.parser(bookFile);

            books.push(book);
          }
        });

        return right(books);
      }

      throw new Error('error in getBooksIdsPerProject');
    } catch (err) {
      console.log(err);
      return left({});
    }
  }
}

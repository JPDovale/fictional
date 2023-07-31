import { Book, BookStructureType } from '@modules/Books/models/Book';
import { Either, left, right } from '@shared/core/error/Either';
import fs from 'node:fs';
import { dataDirs, dataFiles } from '@config/files';
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId';
import { inject, injectable } from 'tsyringe';
import InjectableDependencies from '@shared/container/types';
import { ThreeActsStructuresRepository } from '@database/repositories/ThreeActsStructure/contracts/ThreeActsStructuresRepository';
import { BooksRepository } from '../contracts/BooksRepository';
import { BooksToProjectRepository } from '../contracts/BooksToProjectRepository';
import { BooksToUserRepository } from '../contracts/BooksToUserRepository';

interface BookFile {
  id: string;
  title: string;
  subtitle: string | null;
  structure: string;
  user_id: string;
  project_id: string;
  three_acts_structure_id: string | null;
  image_filename: string | null;
  image_url: string | null;
  created_at: Date;
  updated_at: Date;
}

@injectable()
export class BooksFilesRepository implements BooksRepository {
  constructor(
    @inject(InjectableDependencies.Repositories.BooksToProjectRepository)
    private readonly booksToProjectRepository: BooksToProjectRepository,

    @inject(InjectableDependencies.Repositories.BooksToUserRepository)
    private readonly booksToUserRepository: BooksToUserRepository,

    @inject(InjectableDependencies.Repositories.ThreeActsStructuresRepository)
    private readonly threeActsStructuresRepository: ThreeActsStructuresRepository
  ) {}

  async create(book: Book): Promise<Either<{}, {}>> {
    try {
      const bookFile: BookFile = this.parserToFile(book);

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
        const book = bookFile ? this.parser(bookFile) : null;

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
            const book = this.parser(bookFile);

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

  private parser(bookReceived: BookFile): Book {
    const book = Book.create(
      {
        projectId: new UniqueEntityId(bookReceived.project_id),
        title: bookReceived.title,
        userId: new UniqueEntityId(bookReceived.user_id),
        createdAt: bookReceived.created_at,
        imageFilename: bookReceived.image_filename,
        imageUrl: bookReceived.image_url,
        subtitle: bookReceived.subtitle,
        threeActsStructureId: bookReceived.three_acts_structure_id
          ? new UniqueEntityId(bookReceived.three_acts_structure_id)
          : null,
        updatedAt: bookReceived.updated_at,
        structure: bookReceived.structure as BookStructureType,
      },
      new UniqueEntityId(bookReceived.id)
    );

    return book;
  }

  private parserToFile(book: Book): BookFile {
    const bookFile: BookFile = {
      id: book.id.toString(),
      created_at: book.createdAt,
      image_filename: book.imageFilename,
      image_url: book.imageUrl,
      project_id: book.projectId.toString(),
      subtitle: book.subtitle,
      structure: book.structure,
      three_acts_structure_id: book.threeActsStructureId?.toString() ?? null,
      title: book.title,
      updated_at: book.updatedAt,
      user_id: book.userId.toString(),
    };

    return bookFile;
  }
}

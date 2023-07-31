import { Either, left, right } from '@shared/core/error/Either';
import fs from 'node:fs';
import { dataDirs, dataFiles } from '@config/files';
import { CreatePropsBooksToUser, AddPropsBooksToUser } from '../types';
import { BooksToUserRepository } from '../contracts/BooksToUserRepository';

export class BooksToUserFilesRepository implements BooksToUserRepository {
  async create({
    bookId,
    userId,
  }: CreatePropsBooksToUser): Promise<Either<{}, {}>> {
    try {
      if (!fs.existsSync(dataDirs.booksToUser)) {
        fs.mkdirSync(dataDirs.booksToUser);
      }

      const booksIds = [bookId];

      fs.writeFileSync(
        dataFiles.booksToUser(userId),
        JSON.stringify(booksIds, null, 2)
      );

      return right({});
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async add({ bookId, userId }: AddPropsBooksToUser): Promise<Either<{}, {}>> {
    try {
      const booksIdsResponse = await this.getBooksIdsPerUser(userId);

      if (booksIdsResponse.isRight()) {
        const newBooksIds = [...booksIdsResponse.value, bookId];

        fs.writeFileSync(
          dataFiles.booksToUser(userId),
          JSON.stringify(newBooksIds, null, 2)
        );

        return right({});
      }

      throw new Error('error in getBooksIdsPerUser');
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async getBooksIdsPerUser(userId: string): Promise<Either<{}, string[]>> {
    try {
      if (fs.existsSync(dataFiles.booksToUser(userId))) {
        const booksIdsReceived = fs.readFileSync(
          dataFiles.booksToUser(userId),
          'utf-8'
        );
        const booksIds = JSON.parse(booksIdsReceived);

        return right(booksIds);
      }

      return right([]);
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async createOrAdd({
    bookId,
    userId,
  }: AddPropsBooksToUser | CreatePropsBooksToUser): Promise<Either<{}, {}>> {
    try {
      if (!fs.existsSync(dataFiles.booksToUser(userId))) {
        await this.create({ bookId, userId });
        return right({});
      }

      await this.add({ bookId, userId });
      return right({});
    } catch (err) {
      console.log(err);
      return left({});
    }
  }
}

import { Either, left, right } from '@shared/core/error/Either';
import fs from 'node:fs';
import { dataDirs, dataFiles } from '@config/files';
import { BooksToProjectRepository } from '../contracts/BooksToProjectRepository';
import { CreatePropsBooksToProject, AddPropsBooksToProject } from '../types';

export class BooksToProjectFilesRepository implements BooksToProjectRepository {
  async create({
    bookId,
    projectId,
  }: CreatePropsBooksToProject): Promise<Either<{}, {}>> {
    try {
      if (!fs.existsSync(dataDirs.booksToProject)) {
        fs.mkdirSync(dataDirs.booksToProject);
      }

      const booksIds = [bookId];

      fs.writeFileSync(
        dataFiles.booksToProject(projectId),
        JSON.stringify(booksIds, null, 2)
      );

      return right({});
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async add({
    bookId,
    projectId,
  }: AddPropsBooksToProject): Promise<Either<{}, {}>> {
    try {
      const booksIdsResponse = await this.getBooksIdsPerProject(projectId);

      if (booksIdsResponse.isRight()) {
        const newBooksIds = [...booksIdsResponse.value, bookId];

        fs.writeFileSync(
          dataFiles.booksToProject(projectId),
          JSON.stringify(newBooksIds, null, 2)
        );

        return right({});
      }

      throw new Error('error in getBooksIdsPerProject');
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async getBooksIdsPerProject(
    projectId: string
  ): Promise<Either<{}, string[]>> {
    try {
      if (fs.existsSync(dataFiles.booksToProject(projectId))) {
        const booksIdsReceived = fs.readFileSync(
          dataFiles.booksToProject(projectId),
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
    projectId,
  }: AddPropsBooksToProject | CreatePropsBooksToProject): Promise<
    Either<{}, {}>
  > {
    try {
      if (!fs.existsSync(dataFiles.booksToProject(projectId))) {
        await this.create({ bookId, projectId });
        return right({});
      }

      await this.add({ bookId, projectId });
      return right({});
    } catch (err) {
      console.log(err);
      return left({});
    }
  }
}

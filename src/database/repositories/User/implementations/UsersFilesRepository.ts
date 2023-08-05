import { User } from '@modules/Users/models/User';
import { Either, left, right } from '@shared/core/error/Either';
import fs from 'node:fs';
import { dataFiles } from '@config/files';
import { UsersRepository } from '../contracts/UsersRepository';
import { UserFile } from '../types';

export class UsersFilesRepository implements UsersRepository {
  async create(user: User): Promise<Either<{}, {}>> {
    try {
      const userFile = UsersRepository.parserToFile(user);
      fs.writeFileSync(dataFiles.user(), JSON.stringify(userFile, null, 2));

      return right({});
    } catch (err) {
      console.log(err);

      return left({});
    }
  }

  // _email: string
  async findByEmail(): Promise<Either<{}, User | null>> {
    try {
      const userReceived = fs.readFileSync(dataFiles.user(), 'utf-8');
      const userFile: UserFile | null = userReceived.includes('id')
        ? JSON.parse(userReceived)
        : null;

      const user = userFile ? UsersRepository.parser(userFile) : null;

      return right(user);
    } catch (err) {
      console.log(err);

      return left({});
    }
  }

  // _id: string
  async findById(): Promise<Either<{}, User | null>> {
    try {
      const userReceived = fs.readFileSync(dataFiles.user(), 'utf-8');
      const userFile: UserFile | null = userReceived.includes('id')
        ? JSON.parse(userReceived)
        : null;

      const user = userFile ? UsersRepository.parser(userFile) : null;

      return right(user);
    } catch (err) {
      console.log(err);

      return left({});
    }
  }
}

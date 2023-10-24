import { User } from '@modules/Users/models/User';
import { Either, left, right } from '@shared/core/error/Either';
import { db } from '@database/index';
import { UsersRepository } from '../contracts/UsersRepository';
import { UsersKnexMapper } from './UsersKnexMapper';

export class UsersKnexRepository implements UsersRepository {
  async create(user: User): Promise<Either<{}, {}>> {
    try {
      await db('users').insert(UsersKnexMapper.toKnex(user));
      return right({});
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async findByEmail(email: string): Promise<Either<{}, User | null>> {
    try {
      const user = await db('users').where({ email }).first();

      if (!user) return right(null);

      return right(UsersKnexMapper.toEntity(user));
    } catch (err) {
      console.log(err);
      return left({});
    }
  }

  async findById(id: string): Promise<Either<{}, User | null>> {
    try {
      const user = await db('users').where({ id }).first();

      if (!user) return right(null);

      return right(UsersKnexMapper.toEntity(user));
    } catch (err) {
      console.log(err);
      return left({});
    }
  }
}

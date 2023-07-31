import { Either } from '@shared/core/error/Either';
import { AddPropsBooksToUser, CreatePropsBooksToUser } from '../types';

export abstract class BooksToUserRepository {
  abstract create({
    bookId,
    userId,
  }: CreatePropsBooksToUser): Promise<Either<{}, {}>>;

  abstract add({
    bookId,
    userId,
  }: AddPropsBooksToUser): Promise<Either<{}, {}>>;

  abstract createOrAdd(
    props: CreatePropsBooksToUser | AddPropsBooksToUser
  ): Promise<Either<{}, {}>>;

  abstract getBooksIdsPerUser(userId: string): Promise<Either<{}, string[]>>;
}

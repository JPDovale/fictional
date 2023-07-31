import { Either } from '@shared/core/error/Either';
import { PersonToUserAddProps, PersonToUserCreateProps } from '../types';

export abstract class PersonsToUserRepository {
  abstract create({
    personId,
    userId,
  }: PersonToUserCreateProps): Promise<Either<{}, {}>>;

  abstract add({
    personId,
    userId,
  }: PersonToUserAddProps): Promise<Either<{}, {}>>;

  abstract getPersonsIdsPerUser(userId: string): Promise<Either<{}, string[]>>;
}

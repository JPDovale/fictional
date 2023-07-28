import { User } from '@modules/Users/models/User';
import { Either } from '@shared/core/error/Either';

export abstract class UsersRepository {
  abstract create(user: User): Promise<Either<{}, {}>>;

  abstract findByEmail(email: string): Promise<Either<{}, User | null>>;

  abstract findById(id: string): Promise<Either<{}, User | null>>;
}

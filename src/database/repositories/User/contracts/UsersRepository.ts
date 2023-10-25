import { User } from '@modules/Users/models/User';

export abstract class UsersRepository {
  abstract create(user: User): Promise<void>;

  abstract findByEmail(email: string): Promise<User | null>;

  abstract findById(id: string): Promise<User | null>;
}

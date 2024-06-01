import { User } from '@modules/users/entities/User';
import { UsersRepository } from '@modules/users/repositories/Users.repository';

export class UsersInMemoryRepository implements UsersRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);
    if (!user) return null;
    return user;
  }

  async create(data: User, ctx?: unknown): Promise<void> {
    this.users.push(data);
  }

  async findById(id: string, ctx?: unknown): Promise<User | null> {
    const user = this.users.find((user) => user.id.toString() === id);
    if (!user) return null;
    return user;
  }

  findAll(ctx?: unknown): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  save(data: User, ctx?: unknown): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(id: string, ctx?: unknown): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public users: User[] = [];
}

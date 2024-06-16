import { Repository } from '@shared/core/contracts/Repository'
import { User } from '../entities/User'

export abstract class UsersRepository extends Repository<User> {
  abstract findByEmail(email: string): Promise<User | null>
  abstract findFirst(): Promise<User | null>
}

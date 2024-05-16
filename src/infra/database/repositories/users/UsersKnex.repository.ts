import { User } from '@modules/users/entities/User'
import { UsersRepository } from '@modules/users/repositories/Users.repository'
import { injectable } from 'tsyringe'
import { KnexConnection } from '../..'
import { UsersKnexMapper } from './UsersKnex.mapper'

@injectable()
export class UsersKnexRepository implements UsersRepository {
  constructor(
    private readonly knexConnection: KnexConnection,
    private readonly mapper: UsersKnexMapper,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.knexConnection
      .db('users')
      .where({
        email,
      })
      .first()

    if (!user) return null

    return this.mapper.toDomain(user)
  }

  async create(data: User): Promise<void> {
    await this.knexConnection
      .db('users')
      .insert(this.mapper.toPersistence(data))
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.knexConnection
      .db('users')
      .where({
        id,
      })
      .first()

    if (!user) return null

    return this.mapper.toDomain(user)
  }

  findAll(): Promise<User[]> {
    throw new Error('Method not implemented.')
  }

  save(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}

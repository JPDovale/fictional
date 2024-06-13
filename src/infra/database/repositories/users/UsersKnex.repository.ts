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

  async findFirst(): Promise<User | null> {
    const user = await this.knexConnection.db('users').first()

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

  async save(user: User): Promise<void> {
    await this.knexConnection
      .db('users')
      .where({ id: user.id.toString() })
      .update(this.mapper.toPersistence(user))
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}

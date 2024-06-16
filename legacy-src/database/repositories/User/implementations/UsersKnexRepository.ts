import { User } from '@modules/Users/models/User'
import { db } from '@database/index'
import { UsersRepository } from '../contracts/UsersRepository'
import { UsersKnexMapper } from './UsersKnexMapper'

export class UsersKnexRepository implements UsersRepository {
  async create(user: User): Promise<void> {
    await db('users').insert(UsersKnexMapper.toKnex(user))
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await db('users').where({ email }).first()

    if (!user) return null

    return UsersKnexMapper.toEntity(user)
  }

  async findById(id: string): Promise<User | null> {
    const user = await db('users').where({ id }).first()

    if (!user) return null

    return UsersKnexMapper.toEntity(user)
  }
}

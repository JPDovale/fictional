import { UsersRepository } from '@database/repositories/User/contracts/UsersRepository'
import { UserFile } from '@database/repositories/User/types'
import { User } from '@modules/Users/models/User'
import { Either, left, right } from '@shared/core/error/Either'

export class UsersInMemoryRepository extends UsersRepository {
  private usersList: UserFile[] = []

  get users() {
    return this.usersList
  }

  async create(user: User): Promise<Either<{}, {}>> {
    try {
      this.usersList.push(UsersRepository.parserToFile(user))
      return right({})
    } catch (err) {
      return left({})
    }
  }

  async findByEmail(email: string): Promise<Either<{}, User | null>> {
    try {
      const user = this.usersList.find((u) => u.email === email)
      return right(user ? UsersRepository.parser(user) : null)
    } catch (err) {
      return left({})
    }
  }

  async findById(id: string): Promise<Either<{}, User | null>> {
    try {
      const user = this.usersList.find((u) => u.id.toString() === id)
      return right(user ? UsersRepository.parser(user) : null)
    } catch (err) {
      return left({})
    }
  }
}

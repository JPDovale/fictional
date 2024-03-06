import { User } from '@modules/users/entities/User'
import { Username } from '@modules/users/valueObjects/Username'
import { RepositoryMapper } from '@shared/core/contracts/Repository'
import { UniqueId } from '@shared/core/valueObjects/UniqueId'
import { injectable } from 'tsyringe'

export interface UserFile {
  id: string
  name: string
  username: string
  email: string
  created_at: Date
  updated_at: Date | null
}

@injectable()
export class UsersKenxMapper extends RepositoryMapper<User, UserFile> {
  toDomain(raw: UserFile): User {
    return User.create(
      {
        name: raw.name,
        username: Username.create(raw.username),
        email: raw.email,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
      },
      UniqueId.create(raw.id),
    )
  }

  toPersistence(entity: User): UserFile {
    return {
      id: entity.id.toString(),
      name: entity.name,
      username: entity.username.toString(),
      email: entity.email,
      created_at: entity.createdAt,
      updated_at: entity.updatedAt,
    }
  }
}

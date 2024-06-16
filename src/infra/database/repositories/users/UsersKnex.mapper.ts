import { User } from '@modules/users/entities/User'
import { Username } from '@modules/users/valueObjects/Username'
import { RepositoryMapper } from '@shared/core/contracts/Repository'
import { UniqueId } from '@shared/core/valueObjects/UniqueId'
import { injectable } from 'tsyringe'

export interface UserFile {
  id: string
  name: string
  username: string
  auth_id: string | null
  access_token: string | null
  email: string
  photo_url: string | null
  skip_login: boolean
  verified: boolean
  created_at: Date
  updated_at: Date | null
}

@injectable()
export class UsersKnexMapper extends RepositoryMapper<User, UserFile> {
  toDomain(raw: UserFile): User {
    return User.create(
      {
        name: raw.name,
        username: Username.create(raw.username),
        email: raw.email,
        authId: raw.auth_id,
        accessToken: raw.access_token,
        photoUrl: raw.photo_url,
        verified: raw.verified,
        skipLogin: raw.skip_login,
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
      photo_url: entity.photoUrl,
      skip_login: entity.skipLogin,
      verified: entity.verified,
      access_token: entity.accessToken,
      auth_id: entity.authId,
    }
  }
}

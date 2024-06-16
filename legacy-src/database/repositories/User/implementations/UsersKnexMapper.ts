import { User } from '@modules/Users/models/User'
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId'
import { UserFile } from '../types'

export class UsersKnexMapper {
  static toEntity(raw: UserFile): User {
    return User.create(
      {
        email: raw.email,
        name: raw.name,
        admin: raw.admin,
        age: raw.age,
        avatarFileName: raw.avatar_filename,
        avatarUrl: raw.avatar_url,
        createdAt: raw.created_at,
        emailVerified: raw.email_verified_at,
        newNotifications: raw.new_notifications,
        sex: raw.sex,
        username: raw.username,
        updatedAt: raw.updated_at,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toKnex(user: User): UserFile {
    return {
      admin: user.admin,
      age: user.age,
      avatar_filename: user.avatarFileName,
      avatar_url: user.avatarUrl,
      created_at: user.createdAt,
      email: user.email,
      email_verified_at: user.emailVerified,
      id: user.id.toString(),
      name: user.name,
      new_notifications: user.newNotifications,
      sex: user.sex,
      updated_at: user.updatedAt,
      username: user.username,
    }
  }
}

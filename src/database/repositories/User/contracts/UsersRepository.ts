import { User } from '@modules/Users/models/User';
import { Either } from '@shared/core/error/Either';
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId';
import { UserFile } from '../types';

export abstract class UsersRepository {
  abstract create(user: User): Promise<Either<{}, {}>>;

  abstract findByEmail(email: string): Promise<Either<{}, User | null>>;

  abstract findById(id: string): Promise<Either<{}, User | null>>;

  static parserToFile(user: User): UserFile {
    const userFle: UserFile = {
      email: user.email,
      name: user.name,
      username: user.username,
      admin: user.admin,
      age: user.age,
      avatar_filename: user.avatarFileName,
      avatar_url: user.avatarUrl,
      created_at: user.createdAt,
      email_verified: user.emailVerified,
      id: user.id.toString(),
      id_customer: user.customerId,
      new_notifications: user.newNotifications,
      sex: user.sex,
    };

    return userFle;
  }

  static parser(userReceived: UserFile): User {
    const user = User.create(
      {
        email: userReceived.email,
        name: userReceived.name,
        admin: userReceived.admin,
        age: userReceived.age,
        avatarFileName: userReceived.avatar_filename,
        avatarUrl: userReceived.avatar_url,
        createdAt: userReceived.created_at,
        customerId: userReceived.id_customer,
        emailVerified: userReceived.email_verified,
        newNotifications: userReceived.new_notifications,
        sex: userReceived.sex,
        username: userReceived.username,
      },
      new UniqueEntityId(userReceived.id)
    );

    return user;
  }
}

import { User } from '@modules/Users/models/User';
import { Either, left, right } from '@shared/core/error/Either';
import fs from 'node:fs';
import { dataFiles } from '@config/files';
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId';
import { UsersRepository } from '../contracts/UsersRepository';

interface UserFile {
  id: string;
  id_customer: string | null;
  name: string;
  username: string;
  email: string;
  email_verified: Date | null;
  avatar_url: string | null;
  avatar_filename: string | null;
  sex: string;
  age: number;
  admin: boolean;
  new_notifications: number;
  created_at: Date;
}

export class UsersFilesRepository implements UsersRepository {
  async create(user: User): Promise<Either<{}, {}>> {
    try {
      const userToSave: UserFile = {
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

      fs.writeFileSync(dataFiles.user(), JSON.stringify(userToSave, null, 2));

      return right({});
    } catch (err) {
      console.log(err);

      return left({});
    }
  }

  // _email: string
  async findByEmail(): Promise<Either<{}, User | null>> {
    try {
      const userReceived = fs.readFileSync(dataFiles.user(), 'utf-8');
      const userFile: UserFile | null = userReceived.includes('id')
        ? JSON.parse(userReceived)
        : null;

      const user = userFile ? this.parser(userFile) : null;

      return right(user);
    } catch (err) {
      console.log(err);

      return left({});
    }
  }

  // _id: string
  async findById(): Promise<Either<{}, User | null>> {
    try {
      const userReceived = fs.readFileSync(dataFiles.user(), 'utf-8');
      const userFile: UserFile | null = userReceived.includes('id')
        ? JSON.parse(userReceived)
        : null;

      const user = userFile ? this.parser(userFile) : null;

      return right(user);
    } catch (err) {
      console.log(err);

      return left({});
    }
  }

  private parser(userReceived: UserFile): User {
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

import { Entity } from '@shared/core/entities/Entity';
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId';
import { Optional } from '@shared/core/types/Optional';

export interface UserProps {
  name: string;
  username: string;
  email: string;
  emailVerified: Date | null;
  age: number;
  sex: string;
  admin: boolean;
  createdAt: Date;
  avatarUrl: string | null;
  avatarFileName: string | null;
  newNotifications: number;
  customerId: string | null;
}

export class User extends Entity<UserProps> {
  static create(
    props: Optional<
      UserProps,
      | 'admin'
      | 'age'
      | 'sex'
      | 'avatarFileName'
      | 'avatarUrl'
      | 'createdAt'
      | 'customerId'
      | 'emailVerified'
      | 'newNotifications'
      | 'username'
    >,
    id?: UniqueEntityId
  ) {
    const propsUser: UserProps = {
      admin: props.admin ?? false,
      age: props.age ?? 0,
      avatarFileName: props.avatarFileName ?? null,
      avatarUrl: props.avatarUrl ?? null,
      createdAt: props.createdAt ?? new Date(),
      customerId: props.customerId ?? null,
      emailVerified: props.emailVerified ?? null,
      newNotifications: props.newNotifications ?? 0,
      sex: props.sex ?? 'non-set',
      username:
        props.username ??
        props.name
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/\s+/g, '-')
          .trim(),
      email: props.email,
      name: props.name,
    };

    const user = new User(propsUser, id);

    return user;
  }

  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get username() {
    return this.props.username;
  }

  get age() {
    return this.props.age;
  }

  get sex() {
    return this.props.sex;
  }

  get avatarUrl() {
    return this.props.avatarUrl;
  }

  get avatarFileName() {
    return this.props.avatarFileName;
  }

  get emailVerified() {
    return this.props.emailVerified;
  }

  get customerId() {
    return this.props.customerId;
  }

  get newNotifications() {
    return this.props.newNotifications;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get admin() {
    return this.props.admin;
  }
}

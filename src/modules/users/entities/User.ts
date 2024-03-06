import { Entity } from '@shared/core/entities/Entity'
import { Optional } from '@shared/core/types/Optional'
import { UniqueId } from '@shared/core/valueObjects/UniqueId'
import { Username } from '../valueObjects/Username'

/**
 * @template UserProps - Properties in user
 */
export interface UserProps {
  name: string
  username: Username
  email: string
  createdAt: Date
  updatedAt: Date | null
}

/**
 * @class User - Define a user on system
 * @extends {Entity<UserProps>} - Extend a base entity
 */
export class User extends Entity<UserProps> {
  static create(
    props: Optional<UserProps, 'createdAt' | 'username' | 'updatedAt'>,
    id?: UniqueId,
  ) {
    const propsUser: UserProps = {
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? null,
      username: props.username ?? Username.create(props.name),
      email: props.email,
      name: props.name,
    }

    const user = new User(propsUser, id)

    return user
  }

  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get username() {
    return this.props.username
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  touch() {
    this.props.updatedAt = new Date()
  }
}

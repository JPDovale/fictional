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
  authId: string | null
  photoUrl: string | null
  accessToken: string | null
  verified: boolean
  skipLogin: boolean
  createdAt: Date
  updatedAt: Date | null
}

/**
 * @class User - Define a user on system
 * @extends {Entity<UserProps>} - Extend a base entity
 */
export class User extends Entity<UserProps> {
  static create(
    props: Optional<
      UserProps,
      | 'createdAt'
      | 'username'
      | 'updatedAt'
      | 'authId'
      | 'photoUrl'
      | 'skipLogin'
      | 'verified'
      | 'accessToken'
    >,
    id?: UniqueId,
  ) {
    const propsUser: UserProps = {
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? null,
      username: props.username ?? Username.create(props.name),
      email: props.email,
      name: props.name,
      accessToken: props.accessToken ?? null,
      authId: props.authId ?? null,
      photoUrl: props.photoUrl ?? null,
      verified: props.verified ?? false,
      skipLogin: props.skipLogin ?? false,
    }

    const user = new User(propsUser, id)

    return user
  }

  get name(): string {
    return this.props.name
  }

  set name(name: string | undefined) {
    if (!name) return

    this.props.name = name
    this.touch()
  }

  get email(): string {
    return this.props.email
  }

  set email(email: string | undefined) {
    if (!email) return

    this.props.email = email
    this.touch()
  }

  get username(): Username {
    return this.props.username
  }

  set username(username: Username | string | undefined) {
    if (!username) return

    if (typeof username === 'string') {
      this.props.username = Username.create(username)
      this.touch()
      return
    }

    this.props.username = username
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get authId(): string | null {
    return this.props.authId
  }

  set authId(authId: string | null | undefined) {
    if (authId === undefined) return

    this.props.authId = authId
    this.touch()
  }

  get accessToken(): string | null {
    return this.props.accessToken
  }

  set accessToken(accessToken: string | null | undefined) {
    if (accessToken === undefined) return

    this.props.accessToken = accessToken
    this.touch()
  }

  get photoUrl(): string | null {
    return this.props.photoUrl
  }

  set photoUrl(photoUrl: string | null | undefined) {
    if (photoUrl === undefined) return

    this.props.photoUrl = photoUrl
    this.touch()
  }

  get verified(): boolean {
    return this.props.verified
  }

  set verified(verified: boolean | undefined) {
    if (verified === undefined) return

    this.props.verified = verified
    this.touch()
  }

  get skipLogin(): boolean {
    return this.props.skipLogin
  }

  set skipLogin(skipLogin: boolean | undefined) {
    if (skipLogin === undefined) return

    this.props.skipLogin = skipLogin
    this.touch()
  }

  touch() {
    this.props.updatedAt = new Date()
  }
}

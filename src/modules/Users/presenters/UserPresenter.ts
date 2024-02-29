import { User } from '@modules/Users/models/User'
import { makeValidationErrors } from '@shared/res/MakeValidationErrors'
import { Response, ResponseProps } from '@shared/res/Response'
import { ValidationError } from 'class-validator'

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// TYPES
export abstract class UserResponseAvatar {
  abstract alt: string
  abstract url: string | null
}

abstract class UserResponseInfos {
  abstract username: string
  abstract email: string
  abstract age: number
  abstract sex: string
  abstract name: string
  abstract avatar: UserResponseAvatar
  abstract cratedAt: Date
}

abstract class UserResponseAccount {
  abstract id: string
}

export abstract class UserModelResponse {
  abstract infos: UserResponseInfos
  abstract account: UserResponseAccount
}

export abstract class UserResponsePartied {
  abstract user: UserModelResponse | null
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// IMPLEMENTATION
export class UserPresenter extends Response<
  UserResponsePartied,
  UserPresenter,
  User
>() {
  static create() {
    return new UserPresenter()
  }

  sendErrorValidation(errors: ValidationError[]): UserPresenter {
    return new UserPresenter(makeValidationErrors(errors))
  }

  send(props: ResponseProps<{ user: User }>) {
    const dataPartied = this.parse(props.data?.user ?? null)
    const propsToResponse: ResponseProps<UserResponsePartied> = {
      ...props,
      data: dataPartied,
    }
    return new UserPresenter(propsToResponse)
  }

  parse(user: User | null): UserResponsePartied | null {
    if (!user) return null

    const responsePartied: UserResponsePartied = {
      user: {
        infos: {
          age: user.age,
          avatar: {
            alt: user.name,
            url: user.avatarUrl,
          },
          cratedAt: user.createdAt,
          email: user.email,
          name: user.name,
          sex: user.sex,
          username: user.username,
        },
        account: {
          id: user.id.toString(),
        },
      },
    }

    return responsePartied
  }
}

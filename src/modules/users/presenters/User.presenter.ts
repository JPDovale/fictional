import { Presenter, PresenterProps } from '@shared/core/contracts/Presenter'
import { StatusCode } from '@shared/core/types/StatusCode'
import { injectable } from 'tsyringe'
import { User } from '../entities/User'

export interface UserResponse {
  id: string
  name: string
  username: string
  createdAt: Date
  updatedAt: Date | null
}

export interface UserPresented {
  user: UserResponse
}

@injectable()
export class UserPresenter implements Presenter<User, UserPresented> {
  present(
    raw: User,
    status: StatusCode = StatusCode.OK,
  ): PresenterProps<UserPresented> {
    return {
      status,
      data: {
        user: {
          id: raw.id.toString(),
          name: raw.name,
          username: raw.username.toString(),
          createdAt: raw.createdAt,
          updatedAt: raw.updatedAt,
        },
      },
    }
  }
}

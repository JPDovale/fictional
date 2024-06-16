import { User } from '@modules/Users/models/User'
import { Entity } from '@shared/core/entities/Entity'
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId'

export type PermissionOfUserOnProject = 'edit' | 'view' | 'comment'

interface UserInProjectProps {
  id: UniqueEntityId
  permission: PermissionOfUserOnProject
  avatarUrl: string | null
  username: string
  email: string
}

export class UserInProject extends Entity<UserInProjectProps> {
  static create(user: User, permission: PermissionOfUserOnProject) {
    const propsUserInProject: UserInProjectProps = {
      avatarUrl: user.avatarUrl,
      email: user.email,
      id: user.id,
      permission,
      username: user.username,
    }

    const userInProject = new UserInProject(propsUserInProject)
    return userInProject
  }

  static createCreator(user: User) {
    const propsUserInProject: UserInProjectProps = {
      avatarUrl: user.avatarUrl,
      email: user.email,
      id: user.id,
      permission: 'edit',
      username: user.username,
    }

    const userInProject = new UserInProject(propsUserInProject)
    return userInProject
  }

  get avatarUrl() {
    return this.props.avatarUrl
  }

  get email() {
    return this.props.email
  }

  get permission() {
    return this.props.permission
  }

  get username() {
    return this.props.username
  }

  get id() {
    return this.props.id
  }
}

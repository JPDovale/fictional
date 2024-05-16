import {
  ProjectStructureType,
  ProjectType,
} from '@modules/Projects/models/Project'
import { PersonModelResponse } from '@modules/Persons/dtos/models/types'
import { BookModelResponse } from '@modules/Books/dtos/models/types'
import { PermissionOfUserOnProject } from '@modules/Projects/valueObjects/UsersInProject'
import { UserResponseAvatar } from '@modules/Users/presenters/UserPresenter'
import { ObjectFeatures } from '@modules/Projects/valueObjects/Features'

export abstract class UserInProjectResponse {
  abstract id: string
  abstract permission: PermissionOfUserOnProject
  abstract avatar: UserResponseAvatar
  abstract username: string
  abstract email: string
}

export abstract class ProjectImage {
  abstract url: string | null
  abstract alt: string
}

export abstract class ProjectModelResponse {
  abstract id: string
  abstract name: string
  abstract type: ProjectType
  abstract structure: ProjectStructureType
  abstract features: ObjectFeatures
  abstract creator: UserInProjectResponse | null
  abstract users: UserInProjectResponse[]
  abstract image: ProjectImage
  abstract createdAt: Date
  abstract updatedAt: Date
  abstract persons: PersonModelResponse[]
  abstract books: BookModelResponse[]
}

export abstract class ProjectsResponsePartied {
  abstract projects: ProjectModelResponse[] | null
}

export abstract class ProjectResponsePartied {
  abstract project: ProjectModelResponse | null
}

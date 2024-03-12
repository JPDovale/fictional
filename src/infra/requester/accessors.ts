import { CreateUserController } from '@modules/users/controllers/CreateUser.controller'
import { container } from 'tsyringe'
import { GetUserController } from '@modules/users/controllers/GetUser.controller'
import { CreateProjectController } from '@modules/projects/controllers/CreateProject.controller'
import { GetProjectsController } from '@modules/projects/controllers/GetProjects.controller'
import { GetProjectController } from '@modules/projects/controllers/GetProject.controller'
import { GetFoundationController } from '@modules/foundations/controllers/GetFoundation.controller'
import { UpdateFoundationController } from '@modules/foundations/controllers/UpdateFoundation.controller'
import { Accessors } from './types'

export const accessors = {
  [Accessors.CREATE_USER]: container.resolve(CreateUserController),
  [Accessors.GET_USER]: container.resolve(GetUserController),
  [Accessors.CREATE_PROJECT]: container.resolve(CreateProjectController),
  [Accessors.GET_PROJECTS]: container.resolve(GetProjectsController),
  [Accessors.GET_PROJECT]: container.resolve(GetProjectController),
  [Accessors.GET_FOUNDATION]: container.resolve(GetFoundationController),
  [Accessors.UPDATE_FOUNDATION]: container.resolve(UpdateFoundationController),
}

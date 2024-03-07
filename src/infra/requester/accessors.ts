import { CreateUserController } from '@modules/users/controllers/CreateUser.controller'
import { container } from 'tsyringe'
import { GetUserController } from '@modules/users/controllers/GetUser.controller'
import { Accessors } from './types'

export const accessors = {
  [Accessors.CREATE_USER]: container.resolve(CreateUserController),
  [Accessors.GET_USER]: container.resolve(GetUserController),
}

import { CreateUserController } from '@modules/users/controllers/CreateUser.controller'
import { container } from 'tsyringe'

export enum Accessors {
  CREATE_USER = 'CU',
}

export const accessors = {
  [Accessors.CREATE_USER]: container.resolve(CreateUserController),
}

import { container } from 'tsyringe'
import { CreateUserController } from '@modules/users/controllers/CreateUser.controller'
import { GetUserController } from '@modules/users/controllers/GetUser.controller'
import { CreateProjectController } from '@modules/projects/controllers/CreateProject.controller'

// ++++++++++++++++++++++++++++++++++++++++++
// Users
container.registerSingleton(CreateUserController)
container.registerSingleton(GetUserController)

// ++++++++++++++++++++++++++++++++++++++++++
// Projects
container.registerSingleton(CreateProjectController)

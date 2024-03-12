import { container } from 'tsyringe'
import { CreateUserController } from '@modules/users/controllers/CreateUser.controller'
import { GetUserController } from '@modules/users/controllers/GetUser.controller'
import { CreateProjectController } from '@modules/projects/controllers/CreateProject.controller'
import { GetProjectsController } from '@modules/projects/controllers/GetProjects.controller'
import { GetProjectController } from '@modules/projects/controllers/GetProject.controller'
import { GetFoundationController } from '@modules/foundations/controllers/GetFoundation.controller'
import { UpdateFoundationController } from '@modules/foundations/controllers/UpdateFoundation.controller'

// ++++++++++++++++++++++++++++++++++++++++++
// Users
container.registerSingleton(CreateUserController)
container.registerSingleton(GetUserController)

// ++++++++++++++++++++++++++++++++++++++++++
// Projects
container.registerSingleton(CreateProjectController)
container.registerSingleton(GetProjectsController)
container.registerSingleton(GetProjectController)

// ++++++++++++++++++++++++++++++++++++++++++
// Foundations
container.registerSingleton(GetFoundationController)
container.registerSingleton(UpdateFoundationController)

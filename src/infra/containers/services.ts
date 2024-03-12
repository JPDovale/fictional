import { container } from 'tsyringe'
import { CreateUserService } from '@modules/users/services/CreateUser.service'
import { GetUserService } from '@modules/users/services/GetUser.service'
import { CreateProjectService } from '@modules/projects/services/CreateProject.service'
import { GetProjectsService } from '@modules/projects/services/GetProjects.service'
import { GetProjectService } from '@modules/projects/services/GetProject.service'
import { CreateFoundationService } from '@modules/foundations/services/CreateFoundation.serice'
import { GetFoundationService } from '@modules/foundations/services/GetFoundation.service'
import { UpdateFoundationService } from '@modules/foundations/services/UpdateFoundation.service'

// ++++++++++++++++++++++++++++++++++++++++++
// Users
container.registerSingleton(CreateUserService)
container.registerSingleton(GetUserService)

// ++++++++++++++++++++++++++++++++++++++++++
// Projects
container.registerSingleton(CreateProjectService)
container.registerSingleton(GetProjectsService)
container.registerSingleton(GetProjectService)

// ++++++++++++++++++++++++++++++++++++++++++
// Foundations
container.registerSingleton(CreateFoundationService)
container.registerSingleton(GetFoundationService)
container.registerSingleton(UpdateFoundationService)

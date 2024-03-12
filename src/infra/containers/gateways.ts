import { container } from 'tsyringe'
import { CreateUserGateway } from '@modules/users/gateways/CreateUser.gateway'
import { GetUserGateway } from '@modules/users/gateways/GetUser.gateway'
import { CreateProjectGateway } from '@modules/projects/gateways/CreateProject.gateway'
import { GetProjectsGateway } from '@modules/projects/gateways/GetProjects.gateway'
import { GetProjectGateway } from '@modules/projects/gateways/GetProject.gateway'
import { GetFoundationGateway } from '@modules/foundations/gateways/GetFoundation.gateway'
import { UpdateFoundationGateway } from '@modules/foundations/gateways/UpdateFoundation.gateway'

// ++++++++++++++++++++++++++++++++++++++++++
// Users
container.registerSingleton(CreateUserGateway)
container.registerSingleton(GetUserGateway)

// ++++++++++++++++++++++++++++++++++++++++++
// Projects
container.registerSingleton(CreateProjectGateway)
container.registerSingleton(GetProjectsGateway)
container.registerSingleton(GetProjectGateway)

// ++++++++++++++++++++++++++++++++++++++++++
// Foundations
container.registerSingleton(GetFoundationGateway)
container.registerSingleton(UpdateFoundationGateway)

import { container } from 'tsyringe'
import { CreateUserGateway } from '@modules/users/gateways/CreateUser.gateway'
import { GetUserGateway } from '@modules/users/gateways/GetUser.gateway'
import { CreateProjectGateway } from '@modules/projects/gateways/CreateProject.gateway'

// ++++++++++++++++++++++++++++++++++++++++++
// Users
container.registerSingleton(CreateUserGateway)
container.registerSingleton(GetUserGateway)

// ++++++++++++++++++++++++++++++++++++++++++
// Projects
container.registerSingleton(CreateProjectGateway)

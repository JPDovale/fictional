import { container } from 'tsyringe'
import { CreateUserGateway } from '@modules/users/gateways/CreateUser.gateway'

// ++++++++++++++++++++++++++++++++++++++++++
// Users
container.registerSingleton(CreateUserGateway)

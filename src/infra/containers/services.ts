import { container } from 'tsyringe'
import { CreateUserService } from '@modules/users/services/CreateUser.service'

// ++++++++++++++++++++++++++++++++++++++++++
// Users
container.registerSingleton(CreateUserService)

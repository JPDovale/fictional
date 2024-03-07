import { container } from 'tsyringe'
import { CreateUserService } from '@modules/users/services/CreateUser.service'
import { GetUserService } from '@modules/users/services/GetUser.service'

// ++++++++++++++++++++++++++++++++++++++++++
// Users
container.registerSingleton(CreateUserService)
container.registerSingleton(GetUserService)

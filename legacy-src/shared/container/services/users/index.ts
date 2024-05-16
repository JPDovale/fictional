import { container } from 'tsyringe'
import { GetUserService } from '@modules/Users/services/GetUserService'
import { CreateUserService } from '@modules/Users/services/CreateUserService'
import { Services } from '../types'

container.registerSingleton<GetUserService>(
  Services.GetUserService,
  GetUserService,
)

container.registerSingleton<CreateUserService>(
  Services.CreateUserService,
  CreateUserService,
)

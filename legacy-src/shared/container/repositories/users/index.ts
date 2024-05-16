import { UsersRepository } from '@database/repositories/User/contracts/UsersRepository'
import { container } from 'tsyringe'
import { UsersKnexRepository } from '@database/repositories/User/implementations/UsersKnexRepository'
import { Repositories } from '../types'

container.registerSingleton<UsersRepository>(
  Repositories.UsersRepository,
  UsersKnexRepository,
)

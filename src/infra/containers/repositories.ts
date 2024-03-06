import { container } from 'tsyringe'
import { UsersRepository } from '@modules/users/repositories/Users.repository'
import { UsersKnexRepository } from '../database/repositories/users/UsersKnex.repository'
import { UsersKenxMapper } from '../database/repositories/users/UsersKenx.mapper'

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Users
container.registerSingleton(UsersRepository.name, UsersKnexRepository)
container.registerSingleton(UsersKenxMapper)

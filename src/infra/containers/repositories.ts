import { container } from 'tsyringe'
import { UsersRepository } from '@modules/users/repositories/Users.repository'
import { UsersKnexMapper } from '@infra/database/repositories/users/UsersKnex.mapper'
import { ProjectsRepository } from '@modules/projects/repositories/Projects.repository'
import { ProjectsKnexRepository } from '@infra/database/repositories/projects/ProjectsKnex.repository'
import { ProjectsKnexMapper } from '@infra/database/repositories/projects/ProjectsKnex.mapper'
import { UsersKnexRepository } from '../database/repositories/users/UsersKnex.repository'

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Users
container.registerSingleton(
  UsersRepository as unknown as string,
  UsersKnexRepository,
)
container.registerSingleton(UsersKnexMapper)

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Projects
container.registerSingleton(
  ProjectsRepository as unknown as string,
  ProjectsKnexRepository,
)
container.registerSingleton(ProjectsKnexMapper)

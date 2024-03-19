import { container } from 'tsyringe'
import { UsersRepository } from '@modules/users/repositories/Users.repository'
import { UsersKnexMapper } from '@infra/database/repositories/users/UsersKnex.mapper'
import { ProjectsRepository } from '@modules/projects/repositories/Projects.repository'
import { ProjectsKnexRepository } from '@infra/database/repositories/projects/ProjectsKnex.repository'
import { ProjectsKnexMapper } from '@infra/database/repositories/projects/ProjectsKnex.mapper'
import { FoundationsRepository } from '@modules/foundations/repositories/Foundations.repository'
import { FoundationsKnexRepository } from '@infra/database/repositories/foundations/FoundationsKnex.repository'
import { FoundationsKnexMapper } from '@infra/database/repositories/foundations/FoundationsKnex.mapper'
import { PersonsRepository } from '@modules/persons/repositories/Persons.repository'
import { PersonsKnexRepository } from '@infra/database/repositories/persons/PersonsKnex.repository'
import { PersonsKnexMapper } from '@infra/database/repositories/persons/PersonsKnex.mapper'
import { UsersKnexRepository } from '@infra/database/repositories/users/UsersKnex.repository'
import { AffiliationsRepository } from '@modules/affiliations/repositories/Affiliations.repository'
import { AffiliationsKnexRepository } from '@infra/database/repositories/affiliations/AffiliationsKnex.repository'
import { AffiliationsKnexMapper } from '@infra/database/repositories/affiliations/AffiliationsKnex.mapper'

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

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Foundations
container.registerSingleton(
  FoundationsRepository as unknown as string,
  FoundationsKnexRepository,
)
container.registerSingleton(FoundationsKnexMapper)

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Persons
container.registerSingleton(
  PersonsRepository as unknown as string,
  PersonsKnexRepository,
)
container.registerSingleton(PersonsKnexMapper)

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Affiliations
container.registerSingleton(
  AffiliationsRepository as unknown as string,
  AffiliationsKnexRepository,
)
container.registerSingleton(AffiliationsKnexMapper)

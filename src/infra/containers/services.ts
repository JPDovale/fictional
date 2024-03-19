import { container } from 'tsyringe'
import { CreateUserService } from '@modules/users/services/CreateUser.service'
import { GetUserService } from '@modules/users/services/GetUser.service'
import { CreateProjectService } from '@modules/projects/services/CreateProject.service'
import { GetProjectsService } from '@modules/projects/services/GetProjects.service'
import { GetProjectService } from '@modules/projects/services/GetProject.service'
import { CreateFoundationService } from '@modules/foundations/services/CreateFoundation.serice'
import { GetFoundationService } from '@modules/foundations/services/GetFoundation.service'
import { UpdateFoundationService } from '@modules/foundations/services/UpdateFoundation.service'
import { CreatePersonService } from '@modules/persons/services/CreatePerson.service'
import { GetPersonsService } from '@modules/persons/services/GetPersons.service'
import { CreateAffiliationService } from '@modules/affiliations/services/CreateAffiliation.service'
import { GetAffiliationByParentsIdService } from '@modules/affiliations/services/GetAffiliationByParentsId.service'

// ++++++++++++++++++++++++++++++++++++++++++
// Users
container.registerSingleton(CreateUserService)
container.registerSingleton(GetUserService)

// ++++++++++++++++++++++++++++++++++++++++++
// Projects
container.registerSingleton(CreateProjectService)
container.registerSingleton(GetProjectsService)
container.registerSingleton(GetProjectService)

// ++++++++++++++++++++++++++++++++++++++++++
// Foundations
container.registerSingleton(CreateFoundationService)
container.registerSingleton(GetFoundationService)
container.registerSingleton(UpdateFoundationService)

// ++++++++++++++++++++++++++++++++++++++++++
// Persons
container.registerSingleton(CreatePersonService)
container.registerSingleton(GetPersonsService)

// ++++++++++++++++++++++++++++++++++++++++++
// Affiliations
container.registerSingleton(GetAffiliationByParentsIdService)
container.registerSingleton(CreateAffiliationService)

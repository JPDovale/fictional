import { container } from 'tsyringe'
import { CreateUserController } from '@modules/users/controllers/CreateUser.controller'
import { GetUserController } from '@modules/users/controllers/GetUser.controller'
import { CreateProjectController } from '@modules/projects/controllers/CreateProject.controller'
import { GetProjectsController } from '@modules/projects/controllers/GetProjects.controller'
import { GetProjectController } from '@modules/projects/controllers/GetProject.controller'
import { GetFoundationController } from '@modules/foundations/controllers/GetFoundation.controller'
import { UpdateFoundationController } from '@modules/foundations/controllers/UpdateFoundation.controller'
import { CreatePersonController } from '@modules/persons/controllers/CreatePerson.controller'
import { GetPersonsController } from '@modules/persons/controllers/GetPersons.controller'
import { CreatePersonAttributeService } from '@modules/persons/services/CreatePersonAttribute.service'
import { GetAttributesPreviewController } from '@modules/persons/controllers/GetAttributesPreview.controller'
import { UpdatePersonController } from '@modules/persons/controllers/UpdatePerson.controller'
import { UpdateFileController } from '@modules/files/controllers/UpdateFile.controller'
import { GetFileController } from '@modules/files/controllers/GetFile.controller'

// ++++++++++++++++++++++++++++++++++++++++++
// Users
container.registerSingleton(CreateUserController)
container.registerSingleton(GetUserController)

// ++++++++++++++++++++++++++++++++++++++++++
// Projects
container.registerSingleton(CreateProjectController)
container.registerSingleton(GetProjectsController)
container.registerSingleton(GetProjectController)

// ++++++++++++++++++++++++++++++++++++++++++
// Foundations
container.registerSingleton(GetFoundationController)
container.registerSingleton(UpdateFoundationController)

// ++++++++++++++++++++++++++++++++++++++++++
// Persons
container.registerSingleton(CreatePersonController)
container.registerSingleton(GetPersonsController)
container.registerSingleton(CreatePersonAttributeService)
container.registerSingleton(GetAttributesPreviewController)
container.registerSingleton(UpdatePersonController)

// ++++++++++++++++++++++++++++++++++++++++++
// Files
container.registerSingleton(UpdateFileController)
container.registerSingleton(GetFileController)

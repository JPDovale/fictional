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
import { GetPersonController } from '@modules/persons/controllers/GetPerson.controller'
import { GetTimelinesController } from '@modules/timelines/controllers/GetTimelines.controller'
import { GetTimelineController } from '@modules/timelines/controllers/GetTimeline.controller'
import { UpdateProjectBuildBlocksController } from '@modules/projects/controllers/UpdateProjectBuildBlocks.controller'
import { CreatePersonAttributeMutationController } from '@modules/persons/controllers/CreatePersonAttributeMutation.controller'
import { GetPersonAttributeController } from '@modules/persons/controllers/GetPersonAttribute.controller'
import { DeleteProjectController } from '@modules/projects/controllers/DeleteProject.controller'
import { DeletePersonController } from '@modules/persons/controllers/DeletePerson.controller'
import { DeletePersonAttributeMutationController } from '@modules/persons/controllers/DeletePersonAttributeMutation.controller'
import { ChangePositionPersonAttributeMutationController } from '@modules/persons/controllers/ChangePositionPersonAttributeMutation.controller'
import { UpdatePersonAttributeMutationController } from '@modules/persons/controllers/UpdatePersonAttributeMutation.controller'
import { DeletePersonAttributeController } from '@modules/persons/controllers/DeletePersonAttribute.controller'
import { GetFirstUserController } from '@modules/users/controllers/GetFirsUser.controller'
import { UpdateUserController } from '@modules/users/controllers/UpdateUser.controller'

// ++++++++++++++++++++++++++++++++++++++++++
// Users
container.registerSingleton(CreateUserController)
container.registerSingleton(GetUserController)
container.registerSingleton(GetFirstUserController)
container.registerSingleton(UpdateUserController)

// ++++++++++++++++++++++++++++++++++++++++++
// Projects
container.registerSingleton(CreateProjectController)
container.registerSingleton(GetProjectsController)
container.registerSingleton(GetProjectController)
container.registerSingleton(UpdateProjectBuildBlocksController)
container.registerSingleton(DeleteProjectController)

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
container.registerSingleton(GetPersonController)
container.registerSingleton(CreatePersonAttributeMutationController)
container.registerSingleton(GetPersonAttributeController)
container.registerSingleton(DeletePersonController)
container.registerSingleton(DeletePersonAttributeMutationController)
container.registerSingleton(ChangePositionPersonAttributeMutationController)
container.registerSingleton(UpdatePersonAttributeMutationController)
container.registerSingleton(DeletePersonAttributeController)

// ++++++++++++++++++++++++++++++++++++++++++
// Files
container.registerSingleton(UpdateFileController)
container.registerSingleton(GetFileController)

// ++++++++++++++++++++++++++++++++++++++++++
// Timelines
container.registerSingleton(GetTimelinesController)
container.registerSingleton(GetTimelineController)

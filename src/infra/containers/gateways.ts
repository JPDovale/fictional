import { container } from 'tsyringe'
import { CreateUserGateway } from '@modules/users/gateways/CreateUser.gateway'
import { GetUserGateway } from '@modules/users/gateways/GetUser.gateway'
import { CreateProjectGateway } from '@modules/projects/gateways/CreateProject.gateway'
import { GetProjectsGateway } from '@modules/projects/gateways/GetProjects.gateway'
import { GetProjectGateway } from '@modules/projects/gateways/GetProject.gateway'
import { GetFoundationGateway } from '@modules/foundations/gateways/GetFoundation.gateway'
import { UpdateFoundationGateway } from '@modules/foundations/gateways/UpdateFoundation.gateway'
import { CreatePersonGateway } from '@modules/persons/gateways/CreatePerson.gateway'
import { GetPersonsGateway } from '@modules/persons/gateways/GetPersons.gateway'
import { CreatePersonAttributeGateway } from '@modules/persons/gateways/CreatePersonAttribute.gateway'
import { GetAttributesPreviewGateway } from '@modules/persons/gateways/GetAttributesPreview.gateway'
import { UpdatePersonGateway } from '@modules/persons/gateways/UpdatePerson.gateway'
import { UpdateFileGateway } from '@modules/files/gateways/UpdateFile.gateway'
import { GetFileGateway } from '@modules/files/gateways/GetFile.gateway'
import { GetPersonGateway } from '@modules/persons/gateways/GetPerson.gateway'
import { GetTimelinesGateway } from '@modules/timelines/gateways/GetTimelines.gateways'
import { GetTimelineGateway } from '@modules/timelines/gateways/GetTimeline.gateways'
import { UpdateProjectBuildBlocksGateway } from '@modules/projects/gateways/UpdateProjectBuildBlocks.gateway'
import { CreatePersonAttributeMutationGateway } from '@modules/persons/gateways/CreatePersonAttributeMutation.gateway'
import { GetPersonAttributeGateway } from '@modules/persons/gateways/GetPersonAttribute.gateway'
import { DeleteProjectGateway } from '@modules/projects/gateways/DeleteProject.gateway'
import { DeletePersonGateway } from '@modules/persons/gateways/DeletePerson.gateway'
import { DeletePersonAttributeMutationGateway } from '@modules/persons/gateways/DeletePersonAttributeMutation.gateway'
import { ChangePositionPersonAttributeMutationGateway } from '@modules/persons/gateways/ChangePositionPersonAttributeMutation.gateway'
import { UpdatePersonAttributeMutationGateway } from '@modules/persons/gateways/UpdatePersonAttributeMutation.gateway'
import { DeletePersonAttributeGateway } from '@modules/persons/gateways/DeletePersonAttribute.gateway'
import { UpdateUserGateway } from '@modules/users/gateways/UpdateUser.gateway'

// ++++++++++++++++++++++++++++++++++++++++++
// Users
container.registerSingleton(CreateUserGateway)
container.registerSingleton(GetUserGateway)
container.registerSingleton(UpdateUserGateway)

// ++++++++++++++++++++++++++++++++++++++++++
// Projects
container.registerSingleton(CreateProjectGateway)
container.registerSingleton(GetProjectsGateway)
container.registerSingleton(GetProjectGateway)
container.registerSingleton(UpdateProjectBuildBlocksGateway)
container.registerSingleton(DeleteProjectGateway)

// ++++++++++++++++++++++++++++++++++++++++++
// Foundations
container.registerSingleton(GetFoundationGateway)
container.registerSingleton(UpdateFoundationGateway)

// ++++++++++++++++++++++++++++++++++++++++++
// Persons
container.registerSingleton(CreatePersonGateway)
container.registerSingleton(GetPersonsGateway)
container.registerSingleton(CreatePersonAttributeGateway)
container.registerSingleton(GetAttributesPreviewGateway)
container.registerSingleton(UpdatePersonGateway)
container.registerSingleton(GetPersonGateway)
container.registerSingleton(CreatePersonAttributeMutationGateway)
container.registerSingleton(GetPersonAttributeGateway)
container.registerSingleton(DeletePersonGateway)
container.registerSingleton(DeletePersonAttributeMutationGateway)
container.registerSingleton(ChangePositionPersonAttributeMutationGateway)
container.registerSingleton(UpdatePersonAttributeMutationGateway)
container.registerSingleton(DeletePersonAttributeGateway)

// ++++++++++++++++++++++++++++++++++++++++++
// Files
container.registerSingleton(UpdateFileGateway)
container.registerSingleton(GetFileGateway)

// ++++++++++++++++++++++++++++++++++++++++++
// Timelines
container.registerSingleton(GetTimelinesGateway)
container.registerSingleton(GetTimelineGateway)

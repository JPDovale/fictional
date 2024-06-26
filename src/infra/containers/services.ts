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
import { CreatePersonAttributeService } from '@modules/persons/services/CreatePersonAttribute.service'
import { GetAttributesPreviewService } from '@modules/persons/services/GetAttributesPreview.service'
import { UpdatePersonService } from '@modules/persons/services/UpdatePerson.service'
import { UpdateFileService } from '@modules/files/services/UpdateFile.service'
import { GetFileService } from '@modules/files/services/GetFile.service'
import { GetPersonService } from '@modules/persons/services/GetPerson.service'
import { CreateTimelineService } from '@modules/timelines/services/CreateTimeline.service'
import { CreateManyPersonEventsForDefaultTimelineService } from '@modules/timelines/services/CreateManyPersonEventsForDefaultTimeline.service'
import { GetTimelinesService } from '@modules/timelines/services/GetTimelines.service'
import { GetTimelineService } from '@modules/timelines/services/GetTimeline.service'
import { UpdateProjectBuildBlocksService } from '@modules/projects/services/UpdateProjectBuildBlocks.service'
import { UpdateAllPersonEventsService } from '@modules/timelines/services/UpdateAllPersonEvents.service'
import { UpdateBirthAndDeathDateOfPersonInDeafultTimelineService } from '@modules/timelines/services/UpdateBirthAndDeathDateOfPersonInDefaultTimeline.service'
import { CreatePersonAttributeMutationService } from '@modules/persons/services/CreatePersonAttributeMutation.service'
import { GetPersonAttributeService } from '@modules/persons/services/GetPersonAttribute.service'
import { DeleteProjectService } from '@modules/projects/services/DeleteProject.service'
import { DeletePersonService } from '@modules/persons/services/DeletePerson.service'
import { DeletePersonAttributeMutationService } from '@modules/persons/services/DeletePersonAttributeMutation.service'
import { ChangePositionPersonAttributeMutationService } from '@modules/persons/services/ChagePositionPersonAttributeMutation.service'
import { UpdatePersonAttributeMutationService } from '@modules/persons/services/UpdatePersonAttributeMutation.service'
import { DeletePersonAttributeService } from '@modules/persons/services/DeletePersonAttribute.service'
import { GetFirstUserService } from '@modules/users/services/GetFirstUser.service'
import { UpdateUserService } from '@modules/users/services/UpdateUser.service'

// ++++++++++++++++++++++++++++++++++++++++++
// Users
container.registerSingleton(CreateUserService)
container.registerSingleton(GetUserService)
container.registerSingleton(GetFirstUserService)
container.registerSingleton(UpdateUserService)

// ++++++++++++++++++++++++++++++++++++++++++
// Projects
container.registerSingleton(CreateProjectService)
container.registerSingleton(GetProjectsService)
container.registerSingleton(GetProjectService)
container.registerSingleton(UpdateProjectBuildBlocksService)
container.registerSingleton(DeleteProjectService)

// ++++++++++++++++++++++++++++++++++++++++++
// Foundations
container.registerSingleton(CreateFoundationService)
container.registerSingleton(GetFoundationService)
container.registerSingleton(UpdateFoundationService)

// ++++++++++++++++++++++++++++++++++++++++++
// Persons
container.registerSingleton(CreatePersonService)
container.registerSingleton(GetPersonsService)
container.registerSingleton(CreatePersonAttributeService)
container.registerSingleton(GetAttributesPreviewService)
container.registerSingleton(UpdatePersonService)
container.registerSingleton(GetPersonService)
container.registerSingleton(CreatePersonAttributeMutationService)
container.registerSingleton(GetPersonAttributeService)
container.registerSingleton(DeletePersonService)
container.registerSingleton(DeletePersonAttributeMutationService)
container.registerSingleton(ChangePositionPersonAttributeMutationService)
container.registerSingleton(UpdatePersonAttributeMutationService)
container.registerSingleton(DeletePersonAttributeService)

// ++++++++++++++++++++++++++++++++++++++++++
// Affiliations
container.registerSingleton(GetAffiliationByParentsIdService)
container.registerSingleton(CreateAffiliationService)

// ++++++++++++++++++++++++++++++++++++++++++
// Files
container.registerSingleton(UpdateFileService)
container.registerSingleton(GetFileService)

// ++++++++++++++++++++++++++++++++++++++++++
// Timelines
container.registerSingleton(CreateTimelineService)
container.registerSingleton(CreateManyPersonEventsForDefaultTimelineService)
container.registerSingleton(GetTimelinesService)
container.registerSingleton(GetTimelineService)
container.registerSingleton(UpdateAllPersonEventsService)
container.registerSingleton(
  UpdateBirthAndDeathDateOfPersonInDeafultTimelineService,
)

import { CreateUserController } from '@modules/users/controllers/CreateUser.controller';
import { container } from 'tsyringe';
import { GetUserController } from '@modules/users/controllers/GetUser.controller';
import { CreateProjectController } from '@modules/projects/controllers/CreateProject.controller';
import { GetProjectsController } from '@modules/projects/controllers/GetProjects.controller';
import { GetProjectController } from '@modules/projects/controllers/GetProject.controller';
import { GetFoundationController } from '@modules/foundations/controllers/GetFoundation.controller';
import { UpdateFoundationController } from '@modules/foundations/controllers/UpdateFoundation.controller';
import { CreatePersonController } from '@modules/persons/controllers/CreatePerson.controller';
import { GetPersonsController } from '@modules/persons/controllers/GetPersons.controller';
import { CreatePersonAttributeController } from '@modules/persons/controllers/CreatePersonAttribute.controller';
import { GetAttributesPreviewController } from '@modules/persons/controllers/GetAttributesPreview.controller';
import { UpdatePersonController } from '@modules/persons/controllers/UpdatePerson.controller';
import { Accessors } from './types';
import { UpdateFileController } from '@modules/files/controllers/UpdateFile.controller';
import { GetFileController } from '@modules/files/controllers/GetFile.controller';
import { GetPersonController } from '@modules/persons/controllers/GetPerson.controller';
import { GetTimelinesController } from '@modules/timelines/controllers/GetTimelines.controller';
import { GetTimelineController } from '@modules/timelines/controllers/GetTimeline.controller';
import { UpdateProjectBuildBlocksController } from '@modules/projects/controllers/UpdateProjectBuildBlocks.controller';

export const accessors = {
  [Accessors.CREATE_USER]: container.resolve(CreateUserController),
  [Accessors.GET_USER]: container.resolve(GetUserController),
  [Accessors.CREATE_PROJECT]: container.resolve(CreateProjectController),
  [Accessors.GET_PROJECTS]: container.resolve(GetProjectsController),
  [Accessors.GET_PROJECT]: container.resolve(GetProjectController),
  [Accessors.GET_FOUNDATION]: container.resolve(GetFoundationController),
  [Accessors.UPDATE_FOUNDATION]: container.resolve(UpdateFoundationController),
  [Accessors.CREATE_PERSON]: container.resolve(CreatePersonController),
  [Accessors.GET_PERSONS]: container.resolve(GetPersonsController),
  [Accessors.CREATE_PERSON_ATTRIBUTE]: container.resolve(
    CreatePersonAttributeController
  ),
  [Accessors.GET_ATTRIBUTES_PREVIEW]: container.resolve(
    GetAttributesPreviewController
  ),
  [Accessors.UPDATE_PERSON]: container.resolve(UpdatePersonController),
  [Accessors.UPDATE_FILE]: container.resolve(UpdateFileController),
  [Accessors.GET_FILE]: container.resolve(GetFileController),
  [Accessors.GET_PERSON]: container.resolve(GetPersonController),
  [Accessors.GET_TIMELINES]: container.resolve(GetTimelinesController),
  [Accessors.GET_TIMELINE]: container.resolve(GetTimelineController),
  [Accessors.UPDATE_PROJECT_BUILD_BLOCKS]: container.resolve(
    UpdateProjectBuildBlocksController
  ),
};

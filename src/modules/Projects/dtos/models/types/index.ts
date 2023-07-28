import { UserResponseAvatar } from '@modules/Users/dtos/models/UserResponse/types';
import {
  ProjectStructureType,
  ProjectType,
} from '@modules/Projects/models/Project';
import { ObjectFeatures } from '@modules/Projects/models/Project/valueObjects/Features';
import { PermissionOfUserOnProject } from '@modules/Projects/models/Project/valueObjects/UserInProject';

export abstract class UserInProjectResponse {
  abstract id: string;

  abstract permission: PermissionOfUserOnProject;

  abstract avatar: UserResponseAvatar;

  abstract username: string;

  abstract email: string;
}

export abstract class ThreeActsStructureResponse {
  abstract id: string;

  abstract act1: string | null;

  abstract act2: string | null;

  abstract act3: string | null;
}

export abstract class ProjectImage {
  abstract url: string | null;

  abstract alt: string;
}

export abstract class ProjectModelResponse {
  abstract id: string;

  abstract name: string;

  abstract type: ProjectType;

  abstract structure: ProjectStructureType;

  abstract features: ObjectFeatures;

  abstract creator: UserInProjectResponse | null;

  abstract users: UserInProjectResponse[];

  abstract image: ProjectImage;

  abstract createdAt: Date;

  abstract updatedAt: Date;

  abstract threeActsStructure: ThreeActsStructureResponse | null;
}

export abstract class ProjectsResponsePartied {
  abstract projects: ProjectModelResponse[] | null;
}

export abstract class ProjectResponsePartied {
  abstract project: ProjectModelResponse | null;
}

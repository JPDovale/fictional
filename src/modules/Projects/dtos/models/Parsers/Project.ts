import { Project } from '@modules/Projects/models/Project';
import { ProjectModelResponse } from '../types';

export function ProjectParser(project: Project): ProjectModelResponse {
  const projectPartied = {
    id: project.id.toString(),
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
    features: project.features.toValue(),
    name: project.name,
    type: project.type,
    structure: project.structure,
    users: [],
    image: {
      alt: project.name,
      url: project.imageUrl ?? null,
    },
    creator: project.creator
      ? {
          id: project.creator.id.toString(),
          email: project.creator.email,
          permission: project.creator.permission,
          username: project.creator.username,
          avatar: {
            alt: project.creator.username,
            url: project.creator?.avatarUrl ?? null,
          },
        }
      : null,
    threeActsStructure: project.threeActsStructure
      ? {
          act1: project.threeActsStructure.act1 ?? '',
          act2: project.threeActsStructure.act2 ?? '',
          act3: project.threeActsStructure.act3 ?? '',
          id: project.threeActsStructure.id.toString(),
        }
      : null,
  };

  return projectPartied;
}

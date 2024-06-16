import {
  Project,
  ProjectStructureType,
  ProjectType,
} from '@modules/projects/entities/Project';
import { BuildBlocks } from '@modules/projects/valueObjects/BuildBlocks';
import { RepositoryMapper } from '@shared/core/contracts/Repository';
import { UniqueId } from '@shared/core/valueObjects/UniqueId';
import { injectable } from 'tsyringe';

export interface ProjectFile {
  id: string;
  name: string;
  build_blocks: string;
  type: ProjectType;
  structure_type: ProjectStructureType;
  image: string | null;
  user_id: string;
  created_at: Date;
  updated_at: Date | null;
  trashed_at: Date | null;
}

@injectable()
export class ProjectsKnexMapper extends RepositoryMapper<Project, ProjectFile> {
  toDomain(raw: ProjectFile): Project {
    return Project.create(
      {
        name: raw.name,
        buildBlocks: BuildBlocks.createFromString(raw.build_blocks),
        userId: UniqueId.create(raw.user_id),
        type: raw.type,
        image: raw.image,
        structureType: raw.structure_type,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
        trashedAt: raw.trashed_at,
      },
      UniqueId.create(raw.id)
    );
  }

  toPersistence(entity: Project): ProjectFile {
    return {
      id: entity.id.toString(),
      type: entity.type,
      user_id: entity.userId.toString(),
      structure_type: entity.structureType,
      image: entity.image,
      build_blocks: entity.buildBlocks.toString(),
      name: entity.name,
      created_at: entity.createdAt,
      updated_at: entity.updatedAt,
      trashed_at: entity.trashedAt,
    };
  }
}

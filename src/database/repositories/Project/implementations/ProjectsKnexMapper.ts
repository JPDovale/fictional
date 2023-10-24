import { Project } from '@modules/Projects/models/Project';
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId';
import { Features } from '@modules/Projects/models/Project/valueObjects/Features';
import { ProjectFile } from '../types';

export class ProjectsKnexMapper {
  static toEntity(raw: ProjectFile): Project {
    return Project.create(
      {
        features: Features.createFromString(raw.features),
        name: raw.name,
        userId: new UniqueEntityId(raw.user_id),
        createdAt: raw.created_at,
        imageFileName: raw.image_filename,
        imageUrl: raw.image_url,
        password: raw.password,
        structure: raw.structure,
        type: raw.type,
        updatedAt: raw.updated_at,
      },
      new UniqueEntityId(raw.id)
    );
  }

  static toKnex(project: Project): ProjectFile {
    return {
      created_at: project.createdAt,
      features: project.features.toString(),
      id: project.id.toString(),
      image_filename: project.imageFileName,
      image_url: project.imageUrl,
      name: project.name,
      password: project.password,
      structure: project.structure,
      type: project.type,
      updated_at: project.updatedAt,
      user_id: project.userId.toString(),
    };
  }
}

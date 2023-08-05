import { Project } from '@modules/Projects/models/Project';
import { Features } from '@modules/Projects/models/Project/valueObjects/Features';
import { Either } from '@shared/core/error/Either';
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId';
import {
  ProjectStructureType,
  ProjectType,
} from '@hooks/useCreateProject/validation';
import { ProjectFile } from '../types';

export abstract class ProjectsRepository {
  abstract create(project: Project): Promise<Either<{}, {}>>;

  abstract findManyByUserId(userId: string): Promise<Either<{}, Project[]>>;

  abstract findById(id: string): Promise<Either<{}, Project | null>>;

  static parser(projectReceived: ProjectFile): Project {
    const project = Project.create(
      {
        features: Features.createFromString(projectReceived.features),
        name: projectReceived.name,
        userId: new UniqueEntityId(projectReceived.user_id),
        createdAt: projectReceived.created_at,
        updatedAt: projectReceived.updated_at,
        imageUrl: projectReceived.image_url,
        imageFileName: projectReceived.image_filename,
        type: projectReceived.type as ProjectType,
        password: projectReceived.password,
        structure: projectReceived.structure as ProjectStructureType,
      },
      new UniqueEntityId(projectReceived.id)
    );

    return project;
  }

  static parserToFile(project: Project): ProjectFile {
    const projectFile: ProjectFile = {
      id: project.id.toString(),
      name: project.name,
      features: project.features.toString(),
      image_filename: project.imageFileName,
      created_at: project.createdAt,
      image_url: project.imageUrl,
      password: project.password,
      structure: project.structure,
      type: project.type,
      updated_at: project.updatedAt,
      user_id: project.userId.toString(),
    };

    return projectFile;
  }
}

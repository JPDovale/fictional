import { Project } from '@modules/Projects/models/Project';
import { Either } from '@shared/core/error/Either';

export abstract class ProjectsRepository {
  abstract create(project: Project): Promise<Either<{}, {}>>;

  abstract findManyByUserId(userId: string): Promise<Either<{}, Project[]>>;

  abstract findById(id: string): Promise<Either<{}, Project | null>>;
}

import { Either } from '@shared/core/error/Either';
import { AddProps, CreateProps } from '../types';

export abstract class ProjectsToUserRepository {
  abstract create({ userId, projectId }: CreateProps): Either<{}, {}>;

  abstract add({ userId, projectId }: AddProps): Either<{}, {}>;

  abstract getProjectsIdsPerUser(userId: string): Either<{}, string[]>;
}

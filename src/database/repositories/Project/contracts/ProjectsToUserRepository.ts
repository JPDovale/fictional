import { Either } from '@shared/core/error/Either';
import { AddProps, CreateProps } from '../types';

export abstract class ProjectsToUserRepository {
  abstract create({ userId, projectId }: CreateProps): Promise<Either<{}, {}>>;

  abstract add({ userId, projectId }: AddProps): Promise<Either<{}, {}>>;

  abstract createOrAdd(props: CreateProps | AddProps): Promise<Either<{}, {}>>;

  abstract getProjectsIdsPerUser(userId: string): Promise<Either<{}, string[]>>;
}

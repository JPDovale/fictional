import { Either } from '@shared/core/error/Either';
import { PersonToProjectAddProps, PersonToProjectCreateProps } from '../types';

export abstract class PersonsToProjectRepository {
  abstract create({
    personId,
    projectId,
  }: PersonToProjectCreateProps): Promise<Either<{}, {}>>;

  abstract add({
    personId,
    projectId,
  }: PersonToProjectAddProps): Promise<Either<{}, {}>>;

  abstract getPersonsIdsPerProject(
    projectId: string
  ): Promise<Either<{}, string[]>>;
}

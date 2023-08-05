import { Either } from '@shared/core/error/Either';
import {
  PersonToSnowflakeStructureCreateProps,
  PersonToSnowflakeStructureAddProps,
} from '../types';

export abstract class PersonsToSnowflakeStructureRepository {
  abstract create({
    personId,
    snowflakeStructureId,
  }: PersonToSnowflakeStructureAddProps): Promise<Either<{}, {}>>;

  abstract add({
    personId,
    snowflakeStructureId,
  }: PersonToSnowflakeStructureCreateProps): Promise<Either<{}, {}>>;

  abstract createOrAdd(
    props:
      | PersonToSnowflakeStructureCreateProps
      | PersonToSnowflakeStructureAddProps
  ): Promise<Either<{}, {}>>;

  abstract getPersonsIdsPerSnowflakeStructure(
    userId: string
  ): Promise<Either<{}, string[]>>;
}

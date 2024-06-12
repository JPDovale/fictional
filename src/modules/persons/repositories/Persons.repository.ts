import { Repository } from '@shared/core/contracts/Repository';
import { Person } from '../entities/Person';
import { PersonWithParents } from '../valuesObjects/PersonWithParents';
import { PersonWithDetails } from '../valuesObjects/PersonWithDetails';

export abstract class PersonsRepository<T = unknown> extends Repository<
  Person,
  T
> {
  abstract findManyByProjectId(projectId: string): Promise<Person[]>;
  abstract findManyWithParentsByProjectId(
    projectId: string
  ): Promise<PersonWithParents[]>;
  abstract findWithParentsById(id: string): Promise<PersonWithParents | null>;
  abstract findWithDetailsById(id: string): Promise<PersonWithDetails | null>;
}

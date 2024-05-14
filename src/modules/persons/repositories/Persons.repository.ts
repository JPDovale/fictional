import { Repository } from '@shared/core/contracts/Repository'
import { Person } from '../entities/Person'
import { PersonWithParents } from '../valuesObjects/PersonWithParents'

export abstract class PersonsRepository extends Repository<Person> {
  abstract findManyByProjectId(projectId: string): Promise<Person[]>
  abstract findManyWithParentsByProjectId(
    projectId: string,
  ): Promise<PersonWithParents[]>
}

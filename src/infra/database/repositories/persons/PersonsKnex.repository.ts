import { injectable } from 'tsyringe';
import { PersonsRepository } from '@modules/persons/repositories/Persons.repository';
import { Person } from '@modules/persons/entities/Person';
import { PersonWithParents } from '@modules/persons/valuesObjects/PersonWithParents';
import { KnexConnection } from '../..';
import { PersonsKnexMapper } from './PersonsKnex.mapper';
import { DomainEvents } from '@shared/core/events/DomainEvents';

@injectable()
export class PersonsKnexRepository implements PersonsRepository {
  constructor(
    private readonly knexConnection: KnexConnection,
    private readonly mapper: PersonsKnexMapper
  ) {}

  async create(person: Person): Promise<void> {
    await this.knexConnection
      .db('persons')
      .insert(this.mapper.toPersistence(person));

    DomainEvents.dispatchEventsForAggregate(person.id);
  }

  async findById(id: string): Promise<Person | null> {
    const person = await this.knexConnection
      .db('persons')
      .where({ id })
      .first();

    if (!person) return null;

    return this.mapper.toDomain(person);
  }

  findAll(): Promise<Person[]> {
    throw new Error('Method not implemented.');
  }

  async save(person: Person): Promise<void> {
    await this.knexConnection
      .db('persons')
      .where({ id: person.id.toValue() })
      .update(this.mapper.toPersistence(person));

    DomainEvents.dispatchEventsForAggregate(person.id);
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findManyByProjectId(projectId: string): Promise<Person[]> {
    const persons = await this.knexConnection
      .db('persons')
      .where({
        project_id: projectId,
      })
      .orderBy('created_at', 'desc');

    return persons.map(this.mapper.toDomain);
  }

  async findManyWithParentsByProjectId(
    projectId: string
  ): Promise<PersonWithParents[]> {
    const persons = await this.knexConnection
      .db('persons')
      .where({
        project_id: projectId,
      })
      .leftJoin(
        'person_affiliations',
        'persons.affiliation_id',
        '=',
        'person_affiliations.id'
      )
      .select(
        'persons.*',
        'person_affiliations.father_id',
        'person_affiliations.mother_id'
      )
      .orderBy('created_at', 'desc');

    return persons.map(this.mapper.toDomainWithParrents);
  }

  async findWithParentsById(id: string): Promise<PersonWithParents | null> {
    const person = await this.knexConnection
      .db('persons')
      .where('persons.id', '=', id)
      .leftJoin(
        'person_affiliations',
        'persons.affiliation_id',
        '=',
        'person_affiliations.id'
      )
      .select(
        'persons.*',
        'person_affiliations.father_id',
        'person_affiliations.mother_id'
      )
      .first();

    if (!person) return null;

    return this.mapper.toDomainWithParrents(person);
  }
}

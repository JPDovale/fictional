import { injectable } from 'tsyringe';
import { PersonsRepository } from '@modules/persons/repositories/Persons.repository';
import { Person } from '@modules/persons/entities/Person';
import { PersonWithParents } from '@modules/persons/valuesObjects/PersonWithParents';
import { KnexConnection } from '../..';
import { PersonsKnexMapper } from './PersonsKnex.mapper';
import { DomainEvents } from '@shared/core/events/DomainEvents';
import { TimelinesRepository } from '@modules/timelines/repositories/Timelines.repository';
import { EventsRepository } from '@modules/timelines/repositories/Events.respository';
import { EventsToPersonRepository } from '@modules/timelines/repositories/EventsToPerson.repository';
import {
  BuildBlock,
  BuildBlocks,
} from '@modules/projects/valueObjects/BuildBlocks';
import { PersonWithDetails } from '@modules/persons/valuesObjects/PersonWithDetails';
import { EventToPersonType } from '@modules/timelines/entities/EventToPerson';

@injectable()
export class PersonsKnexRepository implements PersonsRepository {
  constructor(
    private readonly knexConnection: KnexConnection,
    private readonly mapper: PersonsKnexMapper,
    private readonly timelinesRepository: TimelinesRepository,
    private readonly eventsToPersonRepository: EventsToPersonRepository,
    private readonly eventRepository: EventsRepository
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

  async findWithDetailsById(id: string): Promise<PersonWithDetails | null> {
    const person = await this.knexConnection
      .db('persons')
      .where('persons.id', '=', id)
      .leftJoin(
        'person_affiliations',
        'persons.affiliation_id',
        '=',
        'person_affiliations.id'
      )
      .leftJoin('projects', 'persons.project_id', '=', 'projects.id')
      .select(
        'persons.*',
        'projects.build_blocks',
        'person_affiliations.father_id',
        'person_affiliations.mother_id'
      )
      .first();

    if (!person) return null;

    const personWithDetails = {
      ...person,
      birthEvent: null,
      deathEvent: null,
    };

    const projectBuildBlocks = BuildBlocks.createFromString(
      person.build_blocks
    );

    if (!projectBuildBlocks.implements(BuildBlock.TIME_LINES)) {
      return this.mapper.toDomainWithDetails(personWithDetails);
    }

    const timeline = await this.timelinesRepository.findByProjectId(
      person.project_id
    );

    if (!timeline) {
      return this.mapper.toDomainWithDetails(personWithDetails);
    }

    const eventsToPerson =
      await this.eventsToPersonRepository.findBirthAndDeathByPersonIdAndTimelineId(
        {
          personId: id,
          timelineId: timeline.id.toString(),
        }
      );

    const eventsIds = eventsToPerson.map((event) => event.eventId.toString());
    const events = await this.eventRepository.findManyByIds(eventsIds);

    const eventToPersonBirth = eventsToPerson.find(
      (event) => event.type === EventToPersonType.BIRTH
    );
    const eventToPersonDeath = eventsToPerson.find(
      (event) => event.type === EventToPersonType.DEATH
    );

    const birthEvent = events.find((event) =>
      event.id.equals(eventToPersonBirth?.eventId)
    );
    const deathEvent = events.find((event) =>
      event.id.equals(eventToPersonDeath?.eventId)
    );

    personWithDetails.birthEvent = birthEvent ?? null;
    personWithDetails.deathEvent = deathEvent ?? null;

    return this.mapper.toDomainWithDetails(personWithDetails);
  }
}

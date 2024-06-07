import { KnexConfig, KnexConnection } from '@infra/database';
import { injectable } from 'tsyringe';
import {
  EventsToPersonRepository,
  FindBirthAndDeathByPersonIdAndTimelineIdProps,
} from '@modules/timelines/repositories/EventsToPerson.repository';
import {
  EventToPerson,
  EventToPersonType,
} from '@modules/timelines/entities/EventToPerson';
import { EventsToPersonKnexMapper } from './EventsToPersonKnex.mapper';

@injectable()
export class EventsToPersonKnexRepository
  implements EventsToPersonRepository<KnexConfig>
{
  constructor(
    private readonly knexConnection: KnexConnection,
    private readonly mapper: EventsToPersonKnexMapper
  ) {}

  async createMany(
    events: EventToPerson[],
    ctx?: KnexConfig | undefined
  ): Promise<void> {
    const { db } = ctx || this.knexConnection;

    await db('time_line_events_to_person').insert(
      events.map(this.mapper.toPersistence)
    );
  }

  async findManyByPersonId(
    personId: string,
    ctx?: KnexConfig | undefined
  ): Promise<EventToPerson[]> {
    const { db } = ctx || this.knexConnection;
    const eventsToPerson = await db('time_line_events_to_person').where({
      person_id: personId,
      trashed_at: null,
    });

    return eventsToPerson.map(this.mapper.toDomain);
  }

  async findBirthAndDeathByPersonIdAndTimelineId(
    { personId, timelineId }: FindBirthAndDeathByPersonIdAndTimelineIdProps,
    ctx?: KnexConfig | undefined
  ): Promise<EventToPerson[]> {
    const { db } = ctx || this.knexConnection;

    const eventsToPerson = await db('time_line_events_to_person')
      .join(
        'time_line_events',
        'time_line_events_to_person.event_id',
        '=',
        'time_line_events.id'
      )
      .where({
        'time_line_events_to_person.person_id': personId,
        'time_line_events.time_line_id': timelineId,
        'time_line_events_to_person.trashed_at': null,
        'time_line_events.trashed_at': null,
      })
      .whereIn('time_line_events_to_person.type', [
        EventToPersonType.BIRTH,
        EventToPersonType.DEATH,
      ])
      .select('time_line_events_to_person.*');

    return eventsToPerson.map(this.mapper.toDomain);
  }

  async create(
    data: EventToPerson,
    ctx?: KnexConfig | undefined
  ): Promise<void> {
    const { db } = ctx || this.knexConnection;

    await db('time_line_events_to_person').insert(
      this.mapper.toPersistence(data)
    );
  }

  findById(
    id: string,
    ctx?: KnexConfig | undefined
  ): Promise<EventToPerson | null> {
    throw new Error('Method not implemented.');
  }
  findAll(ctx?: KnexConfig | undefined): Promise<EventToPerson[]> {
    throw new Error('Method not implemented.');
  }

  async save(data: EventToPerson, ctx?: KnexConfig | undefined): Promise<void> {
    const { db } = ctx || this.knexConnection;

    await db('time_line_events_to_person')
      .update(this.mapper.toPersistence(data))
      .where('id', data.id.toString());
  }

  delete(id: string, ctx?: KnexConfig | undefined): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

import { KnexConfig, KnexConnection } from '@infra/database';
import { Event } from '@modules/timelines/entities/Event';
import { EventsRepository } from '@modules/timelines/repositories/Events.respository';
import { EventsKnexMapper } from './EventsKnex.mapper';
import { injectable } from 'tsyringe';
import { Logger } from '@utils/logger';

@injectable()
export class EventsKnexRepository implements EventsRepository<KnexConfig> {
  constructor(
    private readonly knexConnection: KnexConnection,
    private readonly mapper: EventsKnexMapper
  ) {}

  async createMany(
    events: Event[],
    ctx?: KnexConfig | undefined
  ): Promise<void> {
    const { db } = ctx || this.knexConnection;

    await db('time_line_events').insert(events.map(this.mapper.toPersistence));
  }

  async findManyByIds(
    ids: string[],
    ctx?: KnexConfig | undefined
  ): Promise<Event[]> {
    const { db } = ctx || this.knexConnection;
    const events = await db('time_line_events')
      .where('trashed_at', null)
      .whereIn('id', ids);
    return events.map(this.mapper.toDomain);
  }

  async saveMany(events: Event[], ctx?: KnexConfig | undefined): Promise<void> {
    const { db } = ctx || this.knexConnection;

    const updatesPromises = events.map((event) =>
      db('time_line_events')
        .update(this.mapper.toPersistence(event))
        .where('id', event.id.toString())
    );

    await Promise.all(updatesPromises);
  }

  async create(data: Event, ctx?: KnexConfig | undefined): Promise<void> {
    const { db } = ctx || this.knexConnection;

    await db('time_line_events').insert(this.mapper.toPersistence(data));
  }

  async findBirthAndDeathByPersonId(
    personId: string,
    ctx?: KnexConfig | undefined
  ): Promise<Event[]> {
    const { db } = ctx ?? this.knexConnection;

    const events = await db('time_line_events_to_person')
      .where({
        'time_line_events_to_person.person_id': personId,
      })
      .join(
        'time_line_events',
        'time_line_events.id',
        '=',
        'time_line_events_to_person.event_id'
      )
      .select('time_line_events.*');

    return events.map(this.mapper.toDomain);
  }

  async findManyByPersonId(
    personId: string,
    ctx?: KnexConfig
  ): Promise<Event[]> {
    const { db } = ctx ?? this.knexConnection;

    const [events, otherEvents] = await Promise.all([
      db('person_attribute_to_person')
        .where({
          'person_attribute_to_person.person_id': personId,
        })
        .join(
          'persons_attributes',
          'persons_attributes.id',
          '=',
          'person_attribute_to_person.attribute_id'
        )
        .join(
          'person_attribute_mutations',
          'person_attribute_mutations.attribute_id',
          '=',
          'persons_attributes.id'
        )
        .join('time_line_events', function () {
          this.on(
            'person_attribute_mutations.event_id',
            '=',
            'time_line_events.id'
          ).andOnNotNull('person_attribute_mutations.event_id');
        })
        .select('time_line_events.*'),
      this.findBirthAndDeathByPersonId(personId, ctx),
    ]);

    return events.map(this.mapper.toDomain).concat(otherEvents);
  }

  async findManyByAttributeId(
    attributeId: string,
    ctx?: KnexConfig
  ): Promise<Event[]> {
    const { db } = ctx ?? this.knexConnection;

    const events = await db('person_attribute_mutations')
      .where({
        'person_attribute_mutations.attribute_id': attributeId,
      })
      .join('time_line_events', function () {
        this.on(
          'person_attribute_mutations.event_id',
          '=',
          'time_line_events.id'
        ).andOnNotNull('person_attribute_mutations.event_id');
      })
      .select('time_line_events.*');

    return events.map(this.mapper.toDomain);
  }

  async findById(
    id: string,
    ctx?: KnexConfig | undefined
  ): Promise<Event | null> {
    const { db } = ctx || this.knexConnection;

    const event = await db('time_line_events')
      .where('id', id)
      .first()
      .select('*');

    if (!event) return null;

    return this.mapper.toDomain(event);
  }

  findAll(ctx?: KnexConfig | undefined): Promise<Event[]> {
    throw new Error('Method not implemented.');
  }

  async save(data: Event, ctx?: KnexConfig | undefined): Promise<void> {
    const { db } = ctx || this.knexConnection;

    await db('time_line_events')
      .update(this.mapper.toPersistence(data))
      .where('id', data.id.toString());
  }

  delete(id: string, ctx?: KnexConfig | undefined): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

import { KnexConfig, KnexConnection } from '@infra/database';
import { injectable } from 'tsyringe';
import { EventsToPersonRepository } from '@modules/timelines/repositories/EventsToPerson.repository';
import { EventToPerson } from '@modules/timelines/entities/EventToPerson';
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
    });

    return eventsToPerson.map(this.mapper.toDomain);
  }

  create(data: EventToPerson, ctx?: KnexConfig | undefined): Promise<void> {
    throw new Error('Method not implemented.');
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
  save(data: EventToPerson, ctx?: KnexConfig | undefined): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(id: string, ctx?: KnexConfig | undefined): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

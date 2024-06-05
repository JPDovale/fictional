import { KnexConfig, KnexConnection } from '@infra/database';
import { Event } from '@modules/timelines/entities/Event';
import { EventsRepository } from '@modules/timelines/repositories/Events.respository';
import { EventsKnexMapper } from './EventsKnex.mapper';
import { injectable } from 'tsyringe';

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

  create(data: Event, ctx?: KnexConfig | undefined): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findById(id: string, ctx?: KnexConfig | undefined): Promise<Event | null> {
    throw new Error('Method not implemented.');
  }
  findAll(ctx?: KnexConfig | undefined): Promise<Event[]> {
    throw new Error('Method not implemented.');
  }
  save(data: Event, ctx?: KnexConfig | undefined): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(id: string, ctx?: KnexConfig | undefined): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

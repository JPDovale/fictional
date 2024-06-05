import { KnexConfig, KnexConnection } from '@infra/database';
import { Timeline } from '@modules/timelines/entities/Timeline';
import { TimelinesRepository } from '@modules/timelines/repositories/Timelines.repository';
import { injectable } from 'tsyringe';
import { TimelinesKnexMapper } from './TimelinesKnex.mapper';

@injectable()
export class TimelinesKnexRepository
  implements TimelinesRepository<KnexConfig>
{
  constructor(
    private readonly knexConnection: KnexConnection,
    private readonly mapper: TimelinesKnexMapper
  ) {}
  async findByProjectId(projectId: string): Promise<Timeline | null> {
    const timeline = await this.knexConnection
      .db('time_lines')
      .where({ project_id: projectId })
      .first();

    if (!timeline) return null;

    return this.mapper.toDomain(timeline);
  }

  async findManyByProjectId(projectId: string): Promise<Timeline[]> {
    const timelines = await this.knexConnection
      .db('time_lines')
      .where({ project_id: projectId })
      .orderBy('created_at', 'desc');

    return timelines.map(this.mapper.toDomain);
  }

  async findWihtEventsById(id: string): Promise<Timeline | null> {
    const timeline = await this.knexConnection
      .db('time_lines')
      .where({ id })
      .first();
    if (!timeline) return null;

    const events = await this.knexConnection
      .db('time_line_events')
      .where({ time_line_id: id })
      .orderBy('created_at', 'asc');

    const timelineWithEvents = { ...timeline, events };

    return this.mapper.toDomainWithEvents(timelineWithEvents);
  }

  async create(data: Timeline, ctx?: KnexConfig | undefined): Promise<void> {
    const { db } = ctx || this.knexConnection;
    await db('time_lines').insert(this.mapper.toPersistence(data));
  }

  findById(id: string, ctx?: KnexConfig | undefined): Promise<Timeline | null> {
    throw new Error('Method not implemented.');
  }
  findAll(ctx?: KnexConfig | undefined): Promise<Timeline[]> {
    throw new Error('Method not implemented.');
  }
  save(data: Timeline, ctx?: KnexConfig | undefined): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(id: string, ctx?: KnexConfig | undefined): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

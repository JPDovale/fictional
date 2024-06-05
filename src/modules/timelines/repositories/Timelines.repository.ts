import { Repository } from '@shared/core/contracts/Repository';
import { Timeline } from '../entities/Timeline';

export abstract class TimelinesRepository<T = unknown> extends Repository<
  Timeline,
  T
> {
  abstract findWihtEventsById(timelineId: string): Promise<Timeline | null>;
  abstract findByProjectId(projectId: string): Promise<Timeline | null>;
  abstract findManyByProjectId(projectId: string): Promise<Timeline[]>;
}

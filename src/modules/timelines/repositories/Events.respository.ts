import { Repository } from '@shared/core/contracts/Repository';
import { Event } from '../entities/Event';

export abstract class EventsRepository<T = unknown> extends Repository<
  Event,
  T
> {
  abstract createMany(events: Event[], ctx?: T): Promise<void>;
}

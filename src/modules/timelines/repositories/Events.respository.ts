import { Repository } from '@shared/core/contracts/Repository';
import { Event } from '../entities/Event';

export abstract class EventsRepository<T = unknown> extends Repository<
  Event,
  T
> {
  abstract createMany(events: Event[], ctx?: T): Promise<void>;
  abstract findManyByIds(ids: string[], ctx?: T): Promise<Event[]>;
  abstract saveMany(events: Event[], ctx?: T): Promise<void>;
  abstract findManyByPersonId(personId: string, ctx?: T): Promise<Event[]>;
  abstract findManyByAttributeId(
    attributeId: string,
    ctx?: T
  ): Promise<Event[]>;
  abstract findBirthAndDeathByPersonId(
    personId: string,
    ctx?: T
  ): Promise<Event[]>;
}

import { Repository } from '@shared/core/contracts/Repository';
import { EventToPerson } from '../entities/EventToPerson';

export interface FindBirthAndDeathByPersonIdAndTimelineIdProps {
  timelineId: string;
  personId: string;
}

export abstract class EventsToPersonRepository<T = unknown> extends Repository<
  EventToPerson,
  T
> {
  abstract createMany(eventsToPerson: EventToPerson[], ctx?: T): Promise<void>;
  abstract findManyByPersonId(
    personId: string,
    ctx?: T
  ): Promise<EventToPerson[]>;
  abstract findBirthAndDeathByPersonIdAndTimelineId(
    props: FindBirthAndDeathByPersonIdAndTimelineIdProps,
    ctx?: T
  ): Promise<EventToPerson[]>;
}

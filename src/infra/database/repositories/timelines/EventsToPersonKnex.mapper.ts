import {
  EventToPerson,
  EventToPersonType,
} from '@modules/timelines/entities/EventToPerson';
import { EventDate } from '@modules/timelines/valueObjects/EventDate';
import { RepositoryMapper } from '@shared/core/contracts/Repository';
import { UniqueId } from '@shared/core/valueObjects/UniqueId';
import { injectable } from 'tsyringe';

export interface EventToPersonFile {
  id: string;
  type: EventToPersonType;
  event_id: string;
  person_id: string;
}

@injectable()
export class EventsToPersonKnexMapper extends RepositoryMapper<
  EventToPerson,
  EventToPersonFile
> {
  toDomain(raw: EventToPersonFile): EventToPerson {
    return EventToPerson.create(
      {
        type: raw.type,
        eventId: UniqueId.create(raw.event_id),
        personId: UniqueId.create(raw.person_id),
      },
      UniqueId.create(raw.id)
    );
  }

  toPersistence(entity: EventToPerson): EventToPersonFile {
    return {
      id: entity.id.toString(),
      event_id: entity.eventId.toString(),
      person_id: entity.personId.toString(),
      type: entity.type,
    };
  }
}

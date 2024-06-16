import {
  EventToPerson,
  EventToPersonType,
} from '@modules/timelines/entities/EventToPerson';
import { RepositoryMapper } from '@shared/core/contracts/Repository';
import { UniqueId } from '@shared/core/valueObjects/UniqueId';
import { injectable } from 'tsyringe';

export interface EventToPersonFile {
  id: string;
  type: EventToPersonType;
  event_id: string;
  person_id: string;
  created_at: Date;
  updated_at: Date | null;
  trashed_at: Date | null;
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
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
        trashedAt: raw.trashed_at,
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
      trashed_at: entity.trashedAt,
      created_at: entity.createdAt,
      updated_at: entity.updatedAt,
    };
  }
}

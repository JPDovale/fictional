import { Event, ImportanceLevel } from '@modules/timelines/entities/Event';
import { EventDate } from '@modules/timelines/valueObjects/EventDate';
import { RepositoryMapper } from '@shared/core/contracts/Repository';
import { UniqueId } from '@shared/core/valueObjects/UniqueId';
import { injectable } from 'tsyringe';

export interface EventFile {
  id: string;
  event: string;
  date: string;
  importance_level: ImportanceLevel;
  time_line_id: string;
  created_at: Date;
  updated_at: Date | null;
  trashed_at: Date | null;
}

@injectable()
export class EventsKnexMapper extends RepositoryMapper<Event, EventFile> {
  toDomain(raw: EventFile): Event {
    return Event.create(
      {
        event: raw.event,
        date: EventDate.createFromString(raw.date),
        timelineId: UniqueId.create(raw.time_line_id),
        importanceLevel: raw.importance_level,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
        trashedAt: raw.trashed_at,
      },
      UniqueId.create(raw.id)
    );
  }

  toPersistence(entity: Event): EventFile {
    return {
      id: entity.id.toString(),
      event: entity.event,
      importance_level: entity.importanceLevel,
      date: entity.date.toString(),
      time_line_id: entity.timelineId.toString(),
      created_at: entity.createdAt,
      updated_at: entity.updatedAt,
      trashed_at: entity.trashedAt,
    };
  }
}

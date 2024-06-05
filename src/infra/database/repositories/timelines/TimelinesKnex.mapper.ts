import { Timeline } from '@modules/timelines/entities/Timeline';
import { RepositoryMapper } from '@shared/core/contracts/Repository';
import { UniqueId } from '@shared/core/valueObjects/UniqueId';
import { injectable } from 'tsyringe';
import { EventFile, EventsKnexMapper } from './EventsKnex.mapper';
import { TimelineEventsList } from '@modules/timelines/entities/TimelineEventsList';

export interface TimelineFile {
  id: string;
  name: string;
  project_id: string;
  created_at: Date;
  updated_at: Date | null;
}

export interface TimelineWithEventsFile extends TimelineFile {
  events: EventFile[];
}

@injectable()
export class TimelinesKnexMapper extends RepositoryMapper<
  Timeline,
  TimelineFile
> {
  constructor(private readonly eventsMapper: EventsKnexMapper) {
    super();
  }

  toDomain(raw: TimelineFile): Timeline {
    return Timeline.create(
      {
        name: raw.name,
        projectId: UniqueId.create(raw.project_id),
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
      },
      UniqueId.create(raw.id)
    );
  }

  toDomainWithEvents(raw: TimelineWithEventsFile): Timeline {
    return Timeline.create(
      {
        name: raw.name,
        projectId: UniqueId.create(raw.project_id),
        events: new TimelineEventsList(
          raw.events.map(this.eventsMapper.toDomain)
        ),
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
      },
      UniqueId.create(raw.id)
    );
  }

  toPersistence(entity: Timeline): TimelineFile {
    return {
      id: entity.id.toString(),
      name: entity.name,
      project_id: entity.projectId.toString(),
      created_at: entity.createdAt,
      updated_at: entity.updatedAt,
    };
  }
}

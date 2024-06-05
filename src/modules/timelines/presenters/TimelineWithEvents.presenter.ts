import { Presenter, PresenterProps } from '@shared/core/contracts/Presenter';
import { StatusCode } from '@shared/core/types/StatusCode';
import { injectable } from 'tsyringe';
import { Timeline } from '../entities/Timeline';

export interface EventResponse {
  id: string;
  event: string;
  date: string;
  dateObject: {
    day: number;
    month: number;
    year: number;
    period: -1 | 0;
    hour: number;
    minute: number;
    second: number;
  };
  createdAt: Date;
  updatedAt: Date | null;
}

export interface TimelineWithEventsResponse {
  id: string;
  name: string;
  projectId: string;
  createdAt: Date;
  updatedAt: Date | null;
  events: EventResponse[];
}

export interface TimelineWithEventsPresented {
  timeline: TimelineWithEventsResponse;
}

export interface TimelinesWithEventsPresented {
  timelines: TimelineWithEventsResponse[];
}

@injectable()
export class TimelineWithEventsPresenter
  implements
    Presenter<
      Timeline,
      TimelineWithEventsPresented,
      TimelinesWithEventsPresented
    >
{
  private parse(raw: Timeline): TimelineWithEventsResponse {
    return {
      id: raw.id.toString(),
      name: raw.name || '??????',
      events: raw.events.getItems().map((event) => ({
        id: event.id.toString(),
        event: event.event,
        date: event.date.toString(),
        dateObject: {
          ...event.date.toValue(),
        },
        createdAt: event.createdAt,
        updatedAt: event.updatedAt,
      })),
      projectId: raw.projectId.toString(),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };
  }

  present(
    raw: Timeline,
    status: StatusCode = StatusCode.OK
  ): PresenterProps<TimelineWithEventsPresented> {
    return {
      status,
      data: {
        timeline: this.parse(raw),
      },
    };
  }

  presentMany(
    raws: Timeline[],
    status: StatusCode = StatusCode.OK
  ): PresenterProps<TimelinesWithEventsPresented> {
    return {
      status,
      data: {
        timelines: raws.map(this.parse),
      },
    };
  }
}

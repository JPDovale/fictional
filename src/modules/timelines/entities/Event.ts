import { AggregateRoot } from '@shared/core/entities/AggregateRoot';
import { Optional } from '@shared/core/types/Optional';
import { UniqueId } from '@shared/core/valueObjects/UniqueId';
import { EventDate } from '../valueObjects/EventDate';

interface EventProps {
  date: EventDate;
  event: string;
  timelineId: UniqueId;
  createdAt: Date;
  updatedAt: Date | null;
}

export class Event extends AggregateRoot<EventProps> {
  static create(
    props: Optional<EventProps, 'createdAt' | 'updatedAt'>,
    id?: UniqueId
  ) {
    const eventProps: EventProps = {
      ...props,
      createdAt: props?.createdAt ?? new Date(),
      updatedAt: props?.updatedAt ?? null,
    };

    const event = new Event(eventProps, id);

    return event;
  }

  get date() {
    return this.props.date;
  }

  get event() {
    return this.props.event;
  }

  get timelineId() {
    return this.props.timelineId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
